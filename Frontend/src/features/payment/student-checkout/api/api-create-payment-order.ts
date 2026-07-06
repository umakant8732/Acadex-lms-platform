import api from '../../../../shared/services/axios.js'
import type { PaymentOrder } from '../types/student-checkout-types'

export interface CreatePaymentOrderResponse {
  success: boolean
  message: string
  data: {
    order: PaymentOrder
  }
}

// Calls backend to create Razorpay order for one course.
export const createPaymentOrderApi = async (courseId: string) => {
  return await api.post<CreatePaymentOrderResponse>(
    `/payment/student/courses/${courseId}/create-order`
  )
}
