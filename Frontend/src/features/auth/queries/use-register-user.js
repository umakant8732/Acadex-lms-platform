import { useMutation } from "@tanstack/react-query";

import { registerUserService } from "../services/service-register-user";

// Runs register request and returns verification-email payload.
export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUserService,
  });
};
