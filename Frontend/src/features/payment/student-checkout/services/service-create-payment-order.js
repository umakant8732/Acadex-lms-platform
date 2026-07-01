import { createPaymentOrderApi } from '../api/api-create-payment-order.js'

// Extracts only checkout order data needed by frontend.
export const createPaymentOrderService = async courseId => {
  const response = await createPaymentOrderApi(courseId)
  return response.data.data.order
}
