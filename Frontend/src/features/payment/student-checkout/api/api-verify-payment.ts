import api from '../../../../shared/services/axios.js'
import type {
  VerifyPaymentPayload,
  PaymentVerificationResult
} from '../types/student-checkout-types'

export interface VerifyPaymentResponse {
  success: boolean
  message: string
  data: {
    verification: PaymentVerificationResult
  }
}

// Sends Razorpay success payload to backend for final verification.
export const verifyPaymentApi = async (payload: VerifyPaymentPayload) => {
  return await api.post<VerifyPaymentResponse>(
    '/payment/student/verify-payment',
    payload
  )
}
