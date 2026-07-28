import { useMutation } from "@tanstack/react-query";

import { resendOtpService } from "../services/service-resend-otp";

//mutation hook to trigger otp request

export const useResendOtp = () => {
  return useMutation({
    mutationFn: resendOtpService,
  });
};
