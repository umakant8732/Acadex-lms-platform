import PaymentAttempt from '../models/payment-attempt-model.js'

// Updates amount and receipt on existing attempt when course price has changed.
export const updatePaymentAttemptAmount = async (
  paymentAttemptId,
  { amount, receipt }
) => {
  return await PaymentAttempt.findByIdAndUpdate(
    paymentAttemptId,
    {
      amount,
      receipt,
      // Clear the old provider order id so a new one gets assigned.
      providerOrderId: null
    },
    {
      new: true,
      runValidators: true
    }
  )
}
