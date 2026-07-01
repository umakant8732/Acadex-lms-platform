import PaymentAttempt from '../models/payment-attempt-model.js'

// Loads one payment attempt by local id for verify flow.
export const findPaymentAttemptById = async paymentAttemptId => {
  return await PaymentAttempt.findById(paymentAttemptId)
}
