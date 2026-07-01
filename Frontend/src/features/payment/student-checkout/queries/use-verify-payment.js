import { useMutation } from '@tanstack/react-query'

import { verifyPaymentService } from '../services/service-verify-payment.js'

// Uses mutation because payment verify runs only after checkout success.
export const useVerifyPayment = () => {
  return useMutation({
    mutationFn: verifyPaymentService
  })
}
