import { createPaymentOrderApi } from '../api/api-create-payment-order.js'
import type { PaymentOrder } from '../types/student-checkout-types'

// Extracts only checkout order data needed by frontend.
export const createPaymentOrderService = async (courseId: string): Promise<PaymentOrder> => {
  const response = await createPaymentOrderApi(courseId)
  return response.data.data.order
}
