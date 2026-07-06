import { reportPaymentFailureApi } from '../api/api-report-payment-failure.js'
import type { ReportPaymentFailurePayload } from '../types/student-checkout-types'

// Extracts failed payment result after backend stores gateway error details.
export const reportPaymentFailureService = async (payload: ReportPaymentFailurePayload): Promise<any> => {
  const response = await reportPaymentFailureApi(payload)
  return response.data.data.failure
}
