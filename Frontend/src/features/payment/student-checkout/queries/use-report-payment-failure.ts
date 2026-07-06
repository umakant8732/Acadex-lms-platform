import { useMutation } from '@tanstack/react-query'
import { reportPaymentFailureService } from '../services/service-report-payment-failure.js'
import type { ReportPaymentFailurePayload } from '../types/student-checkout-types'

// Uses mutation because checkout failure is pushed only after SDK fail event.
export const useReportPaymentFailure = () => {
  return useMutation<any, Error, ReportPaymentFailurePayload>({
    mutationFn: reportPaymentFailureService
  })
}
