import api from '../../../../shared/services/axios.js'

// Calls backend to create Razorpay order for one course.
export const createPaymentOrderApi = async courseId => {
  return await api.post(`/payment/student/courses/${courseId}/create-order`)
}
