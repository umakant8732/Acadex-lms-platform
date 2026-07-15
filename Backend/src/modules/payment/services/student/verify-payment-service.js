import crypto from 'node:crypto'
import mongoose from 'mongoose'

import ApiError from '../../../../utils/api-error.js'
import { logger } from '../../../../utils/logger.js'

import { env } from '../../../../config/env.js'

import { createEnrollment } from '../../../enrollment/repositories/create-enrollment-repository.js'
import { findEnrollmentByPaymentAttemptId } from '../../../enrollment/repositories/find-enrollment-by-payment-attempt-id-repository.js'

import { findPaymentAttemptById } from '../../repositories/find-payment-attempt-by-id-repository.js'
import { markPaymentAttemptFailed } from '../../repositories/mark-payment-attempt-failed-repository.js'
import { markPaymentAttemptFulfilled } from '../../repositories/mark-payment-attempt-fulfilled-repository.js'
import { markPaymentAttemptVerified } from '../../repositories/mark-payment-attempt-verified-repository.js'
import User from '../../../auth/models/user-model.js'
import Course from '../../../course/models/course-model.js'
import { sendInvoiceEmailJob } from '../../../auth/jobs/auth-email-job.js'

// Builds expected Razorpay signature using order id, payment id, and secret.
const createExpectedSignature = ({ orderId, paymentId }) => {
  return crypto
    .createHmac('sha256', env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest('hex')
}

// Compares signatures safely before course access is unlocked.
const isValidSignature = ({ expectedSignature, razorpaySignature }) => {
  const expectedBuffer = Buffer.from(expectedSignature, 'utf8')
  const actualBuffer = Buffer.from(razorpaySignature, 'utf8')

  if (expectedBuffer.length !== actualBuffer.length) {
    return false
  }

  return crypto.timingSafeEqual(expectedBuffer, actualBuffer)
}

// Verifies Razorpay payment, then creates final enrollment safely.
export const verifyPaymentService = async ({
  paymentAttemptId,
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature
}) => {
  // Stop early if local payment attempt id is not valid.
  if (!mongoose.Types.ObjectId.isValid(paymentAttemptId)) {
    throw new ApiError(400, 'Invalid payment attempt id')
  }

  // Load local payment attempt first because verify flow depends on it.
  const paymentAttempt = await findPaymentAttemptById(paymentAttemptId)

  if (!paymentAttempt) {
    throw new ApiError(404, 'Payment attempt not found')
  }

  // Provider order id must match local order id or verification should stop.
  if (paymentAttempt.providerOrderId !== razorpayOrderId) {
    await markPaymentAttemptFailed({
      paymentAttemptId,
      failureReason: 'Provider order id mismatch',
      metadata: {
        razorpayOrderId
      }
    })

    throw new ApiError(400, 'Payment order mismatch')
  }

  // If enrollment already exists for same payment attempt, return safely.
  const existingEnrollment = await findEnrollmentByPaymentAttemptId(
    paymentAttempt._id
  )

  if (existingEnrollment) {
    logger.info(
      `Enrollment already exists for paymentAttemptId=${paymentAttempt._id}`
    )

    return {
      enrollment: existingEnrollment,
      paymentAttempt,
      isAlreadyFulfilled: true
    }
  }

  // Build expected signature exactly like Razorpay docs describe.
  const expectedSignature = createExpectedSignature({
    orderId: razorpayOrderId,
    paymentId: razorpayPaymentId
  })

  if (
    !isValidSignature({
      expectedSignature,
      razorpaySignature
    })
  ) {
    await markPaymentAttemptFailed({
      paymentAttemptId,
      failureReason: 'Invalid payment signature',
      metadata: {
        razorpayOrderId,
        razorpayPaymentId
      }
    })

    throw new ApiError(400, 'Invalid payment signature')
  }

  // Signature is valid, so mark local payment attempt as verified.
  const verifiedPaymentAttempt = await markPaymentAttemptVerified({
    paymentAttemptId: paymentAttempt._id,
    providerPaymentId: razorpayPaymentId,
    providerSignature: razorpaySignature,
    metadata: {
      verifiedBy: 'verify-payment-api'
    }
  })

  if (!verifiedPaymentAttempt) {
    throw new ApiError(500, 'Failed to verify payment attempt')
  }

  // After verify succeeds, create final course access for the student.
  const enrollment = await createEnrollment({
    userId: verifiedPaymentAttempt.userId,
    courseId: verifiedPaymentAttempt.courseId,
    paymentAttemptId: verifiedPaymentAttempt._id
  })

  // Mark payment attempt fulfilled after enrollment is created.
  const fulfilledPaymentAttempt = await markPaymentAttemptFulfilled({
    paymentAttemptId: verifiedPaymentAttempt._id,
    enrollmentId: enrollment._id
  })

  if (!fulfilledPaymentAttempt) {
    throw new ApiError(500, 'Failed to finalize payment attempt')
  }

  logger.info(
    `Payment verified and enrollment created for paymentAttemptId=${fulfilledPaymentAttempt._id}`
  )

  // Trigger receipt email sending via BullMQ queue
  try {
    const user = await User.findById(verifiedPaymentAttempt.userId)
    const course = await Course.findById(verifiedPaymentAttempt.courseId)

    if (user && course) {
      await sendInvoiceEmailJob({
        email: user.email,
        fullName: user.fullName,
        courseTitle: course.title,
        price: fulfilledPaymentAttempt.amount,
        providerPaymentId: fulfilledPaymentAttempt.providerPaymentId,
        receipt: fulfilledPaymentAttempt.receipt,
        paidAt: fulfilledPaymentAttempt.paidAt || new Date()
      })
      logger.info(`Verify Payment: Enqueued purchase receipt email to ${user.email}`)
    }
  } catch (error) {
    logger.error(`Verify Payment Email Queue Error: ${error.message}`)
  }

  return {
    enrollment,
    paymentAttempt: fulfilledPaymentAttempt,
    isAlreadyFulfilled: false
  }
}
