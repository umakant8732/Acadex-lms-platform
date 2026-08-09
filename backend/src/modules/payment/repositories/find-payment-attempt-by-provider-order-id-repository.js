import PaymentAttempt from '../models/payment-attempt-model.js'

// Loads payment attempt by provider order id for webhook flow later.
export const findPaymentAttemptByProviderOrderId = async providerOrderId => {
  return await PaymentAttempt.findOne({
    providerOrderId
  })
}
