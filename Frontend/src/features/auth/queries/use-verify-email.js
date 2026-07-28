import { useMutation } from "@tanstack/react-query";

import { verifyEmailService } from "../services/service-verify-email";

// Verifies OTP and completes email verification flow.
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmailService,
  });
};
