import PaymentAttempt from '../models/payment-attempt-model.js'

import { PAYMENT_ATTEMPT_STATUS } from '../constants/payment-constants.js'

// Marks payment attempt as failed so student can retry safely later.
export const markPaymentAttemptFailed = async ({
  paymentAttemptId,
  failureReason,
  metadata = {}
}) => {
  return await PaymentAttempt.findByIdAndUpdate(
    paymentAttemptId,
    {
      status: PAYMENT_ATTEMPT_STATUS.FAILED,
      failedAt: new Date(),
      failureReason,
      $set: {
        'metadata.failure': metadata
      }
    },
    {
      new: true,
      runValidators: true
    }
  )
}
