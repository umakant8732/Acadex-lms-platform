import { useMutation } from '@tanstack/react-query'
import { createPaymentOrderService } from '../services/service-create-payment-order.js'
import type { PaymentOrder } from '../types/student-checkout-types'

// Uses mutation because payment order is created only on button click.
export const useCreatePaymentOrder = () => {
  return useMutation<PaymentOrder, Error, string>({
    mutationFn: createPaymentOrderService
  })
}
