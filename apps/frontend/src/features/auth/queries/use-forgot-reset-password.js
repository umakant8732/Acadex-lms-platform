import { useMutation } from "@tanstack/react-query";
import { forgotPasswordService } from "../services/service-forgot-password";
import { resetPasswordService } from "../services/service-reset-password";

// Hook to trigger forgot-password request
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPasswordService,
  });
};

// Hook to trigger reset-password request
export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPasswordService,
  });
};
