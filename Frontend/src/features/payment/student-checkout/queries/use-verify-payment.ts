import { useMutation } from '@tanstack/react-query'
import { verifyPaymentService } from '../services/service-verify-payment.js'
import type { VerifyPaymentPayload, PaymentVerificationResult } from '../types/student-checkout-types'

// Uses mutation because payment verify runs only after checkout success.
export const useVerifyPayment = () => {
  return useMutation<PaymentVerificationResult, Error, VerifyPaymentPayload>({
    mutationFn: verifyPaymentService
  })
}
