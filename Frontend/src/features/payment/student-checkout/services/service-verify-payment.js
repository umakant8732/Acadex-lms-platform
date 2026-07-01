import { verifyPaymentApi } from '../api/api-verify-payment.js'

// Extracts final verified payment result from backend response.
export const verifyPaymentService = async payload => {
  const response = await verifyPaymentApi(payload)
  return response.data.data.verification
}
