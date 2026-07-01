import mongoose from 'mongoose'

import ApiError from '../../../../utils/api-error.js'

import { PAYMENT_ATTEMPT_STATUS } from '../../constants/payment-constants.js'
import { findPaymentAttemptById } from '../../repositories/find-payment-attempt-by-id-repository.js'
import { markPaymentAttemptFailed } from '../../repositories/mark-payment-attempt-failed-repository.js'

// Saves Razorpay checkout failure so retry flow has audit trail.
export const reportPaymentFailureService = async ({
  paymentAttemptId,
  razorpayOrderId,
  razorpayPaymentId,
  failureReason,
  failureCode,
  failureSource,
  failureStep,
  failureField
}) => {
  if (!mongoose.Types.ObjectId.isValid(paymentAttemptId)) {
    throw new ApiError(400, 'Invalid payment attempt id')
  }

  const paymentAttempt = await findPaymentAttemptById(paymentAttemptId)

  if (!paymentAttempt) {
    throw new ApiError(404, 'Payment attempt not found')
  }

  // Stops wrong client from marking some other order as failed.
  if (
    razorpayOrderId &&
    paymentAttempt.providerOrderId &&
    paymentAttempt.providerOrderId !== razorpayOrderId
  ) {
    throw new ApiError(400, 'Payment order mismatch')
  }

  // Do not overwrite final success states with late failure callbacks.
  if (
    paymentAttempt.status === PAYMENT_ATTEMPT_STATUS.FULFILLED ||
    paymentAttempt.status === PAYMENT_ATTEMPT_STATUS.VERIFIED
  ) {
    return {
      paymentAttempt,
      isIgnored: true,
      isAlreadyFailed: false
    }
  }

  if (paymentAttempt.status === PAYMENT_ATTEMPT_STATUS.FAILED) {
    return {
      paymentAttempt,
      isIgnored: false,
      isAlreadyFailed: true
    }
  }

  const failedPaymentAttempt = await markPaymentAttemptFailed({
    paymentAttemptId: paymentAttempt._id,
    failureReason: failureReason || 'Payment failed at Razorpay checkout',
    metadata: {
      razorpayOrderId,
      razorpayPaymentId,
      failureCode,
      failureSource,
      failureStep,
      failureField
    }
  })

  if (!failedPaymentAttempt) {
    throw new ApiError(500, 'Failed to save payment failure details')
  }

  return {
    paymentAttempt: failedPaymentAttempt,
    isIgnored: false,
    isAlreadyFailed: false
  }
}
