import api from '../../../../shared/services/axios.js'

// Sends Razorpay success payload to backend for final verification.
export const verifyPaymentApi = async payload => {
  return await api.post('/payment/student/verify-payment', payload)
}
