import { reportPaymentFailureApi } from '../api/api-report-payment-failure.js'

// Extracts failed payment result after backend stores gateway error details.
export const reportPaymentFailureService = async payload => {
  const response = await reportPaymentFailureApi(payload)
  return response.data.data.failure
}
