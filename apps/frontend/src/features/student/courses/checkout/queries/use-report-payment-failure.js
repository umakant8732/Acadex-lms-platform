import { useMutation } from "@tanstack/react-query";
import { reportPaymentFailureService } from "../services/service-report-payment-failure";

// Uses mutation because checkout failure is pushed only after SDK fail event.
export const useReportPaymentFailure = () => {
  return useMutation({
    mutationFn: reportPaymentFailureService,
  });
};
