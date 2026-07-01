import PaymentAttempt from '../models/payment-attempt-model.js'

import { PAYMENT_ATTEMPT_STATUS } from '../constants/payment-constants.js'

// Marks payment attempt as fulfilled after enrollment is created.
export const markPaymentAttemptFulfilled = async ({
  paymentAttemptId,
  enrollmentId
}) => {
  return await PaymentAttempt.findByIdAndUpdate(
    paymentAttemptId,
    {
      status: PAYMENT_ATTEMPT_STATUS.FULFILLED,
      fulfilledAt: new Date(),
      $set: {
        'metadata.enrollmentId': String(enrollmentId)
      }
    },
    {
      new: true,
      runValidators: true
    }
  )
}
