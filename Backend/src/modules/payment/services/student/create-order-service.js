import mongoose from 'mongoose'
import { randomUUID } from 'node:crypto'

import ApiError from '../../../../utils/api-error.js'
import { logger } from '../../../../utils/logger.js'

import { env } from '../../../../config/env.js'
import { razorpayInstance } from '../../../../config/razorpay.js'

import { buildCourseThumbnailUrl } from '../../../course/helpers/build-course-thumbnail-url.js'
import { findCourseById } from '../../../course/repositories/find-course-by-id-repository.js'
import { findActiveEnrollmentByUserAndCourse } from '../../../enrollment/repositories/find-active-enrollment-repository.js'

import { createPaymentAttempt } from '../../repositories/create-payment-attempt-repository.js'
import { findActivePaymentAttemptByUserAndCourse } from '../../repositories/find-active-payment-attempt-repository.js'
import { updatePaymentAttemptOrderId } from '../../repositories/update-payment-attempt-order-repository.js'

// Creates checkout order data for one student and one course.
export const createOrderService = async ({ userId, courseId }) => {
  // Stop early if route param is not a valid mongo id.
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, 'Invalid course id')
  }

  // Load course first because payment depends on real course data.
  const course = await findCourseById(courseId)

  if (!course) {
    throw new ApiError(404, 'Course not found')
  }

  if (!course.isPublished) {
    throw new ApiError(400, 'This course is not available for purchase')
  }

  // If student already owns the course, no payment should start again.
  const activeEnrollment = await findActiveEnrollmentByUserAndCourse(
    userId,
    courseId
  )

  if (activeEnrollment) {
    throw new ApiError(409, 'You already own this course')
  }

  // Razorpay expects amount in smallest currency unit.
  const amountInPaise = Math.round(Number(course.price) * 100)

  if (!Number.isFinite(amountInPaise) || amountInPaise < 100) {
    throw new ApiError(400, 'Invalid course price for payment')
  }

  // Reuse active attempt to avoid duplicate orders on double click / refresh.
  const existingActiveAttempt = await findActivePaymentAttemptByUserAndCourse(
    userId,
    courseId
  )

  if (existingActiveAttempt?.providerOrderId) {
    // If course price changed since attempt was created, skip reuse so
    // student always pays the current price, not a stale cached amount.
    const priceChanged = existingActiveAttempt.amount !== amountInPaise

    if (!priceChanged) {
      logger.info(
        `Reusing active payment attempt for userId=${userId} courseId=${courseId}`
      )

      return {
        paymentAttemptId: existingActiveAttempt._id,
        orderId: existingActiveAttempt.providerOrderId,
        amount: existingActiveAttempt.amount,
        currency: existingActiveAttempt.currency,
        keyId: env.RAZORPAY_KEY_ID,
        course: {
          _id: course._id,
          title: course.title,
          price: course.price,
          thumbnail: buildCourseThumbnailUrl(course.thumbnailKey)
        },
        isExistingAttempt: true
      }
    }

    logger.info(
      `Course price changed (old=${existingActiveAttempt.amount} new=${amountInPaise}), creating fresh order for userId=${userId} courseId=${courseId}`
    )
  }


  // Create fresh attempt only when reusable active attempt is not available
  // or when price has changed (existingActiveAttempt reuse is skipped above in that case).
  const priceChangedOrNoAttempt =
    !existingActiveAttempt ||
    existingActiveAttempt.amount !== amountInPaise

  const paymentAttempt =
    !priceChangedOrNoAttempt
      ? existingActiveAttempt
      : await createPaymentAttempt({
          userId,
          courseId,
          amount: amountInPaise,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}_${randomUUID().slice(0, 8)}`,
          metadata: {
            courseTitle: course.title
          }
        })

  // Create real Razorpay order after local payment attempt is ready.
  const razorpayOrder = await razorpayInstance.orders.create({
    amount: paymentAttempt.amount,
    currency: paymentAttempt.currency,
    receipt: paymentAttempt.receipt,
    notes: {
      userId: String(userId),
      courseId: String(courseId)
    }
  })

  // Save provider order id so verify and webhook can map provider to local attempt.
  const updatedPaymentAttempt = await updatePaymentAttemptOrderId(
    paymentAttempt._id,
    razorpayOrder.id
  )

  if (!updatedPaymentAttempt) {
    throw new ApiError(500, 'Failed to save payment order details')
  }

  logger.info(
    `Payment order created for userId=${userId} courseId=${courseId} paymentAttemptId=${updatedPaymentAttempt._id}`
  )

  // Return only checkout data frontend needs to open Razorpay SDK.
  return {
    paymentAttemptId: updatedPaymentAttempt._id,
    orderId: updatedPaymentAttempt.providerOrderId,
    amount: updatedPaymentAttempt.amount,
    currency: updatedPaymentAttempt.currency,
    keyId: env.RAZORPAY_KEY_ID,
    course: {
      _id: course._id,
      title: course.title,
      price: course.price,
      thumbnail: buildCourseThumbnailUrl(course.thumbnailKey)
    },
    isExistingAttempt: false
  }
}
