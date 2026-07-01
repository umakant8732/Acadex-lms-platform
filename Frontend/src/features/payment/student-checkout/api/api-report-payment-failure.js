import api from '../../../../shared/services/axios.js'

// Sends Razorpay failure payload so backend can save retry details.
export const reportPaymentFailureApi = async payload => {
  return await api.post('/payment/student/report-failure', payload)
}
