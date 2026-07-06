import api from '../../../../shared/services/axios.js'
import type { ReportPaymentFailurePayload } from '../types/student-checkout-types'

export interface ReportPaymentFailureResponse {
  success: boolean
  message: string
  data: {
    failure: any
  }
}

// Sends Razorpay failure payload so backend can save retry details.
export const reportPaymentFailureApi = async (payload: ReportPaymentFailurePayload) => {
  return await api.post<ReportPaymentFailureResponse>(
    '/payment/student/report-failure',
    payload
  )
}
