import { useMutation } from "@tanstack/react-query";
import { createPaymentOrderService } from "../services/service-create-payment-order";

// Uses mutation because payment order is created only on button click.
export const useCreatePaymentOrder = () => {
  return useMutation({
    mutationFn: createPaymentOrderService,
  });
};
