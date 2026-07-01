import PaymentAttempt from '../models/payment-attempt-model.js'

import { PAYMENT_ATTEMPT_STATUS } from '../constants/payment-constants.js'

// Marks payment attempt as verified after signature check passes.
export const markPaymentAttemptVerified = async ({
  paymentAttemptId,
  providerPaymentId,
  providerSignature,
  metadata = {}
}) => {
  return await PaymentAttempt.findByIdAndUpdate(
    paymentAttemptId,
    {
      providerPaymentId,
      providerSignature,
      status: PAYMENT_ATTEMPT_STATUS.VERIFIED,
      paidAt: new Date(),
      $set: {
        'metadata.verification': metadata
      }
    },
    {
      new: true,
      runValidators: true
    }
  )
}
