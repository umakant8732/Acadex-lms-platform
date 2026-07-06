import { verifyPaymentApi } from '../api/api-verify-payment.js'
import type { VerifyPaymentPayload, PaymentVerificationResult } from '../types/student-checkout-types'

// Extracts final verified payment result from backend response.
export const verifyPaymentService = async (payload: VerifyPaymentPayload): Promise<PaymentVerificationResult> => {
  const response = await verifyPaymentApi(payload)
  return response.data.data.verification
}
