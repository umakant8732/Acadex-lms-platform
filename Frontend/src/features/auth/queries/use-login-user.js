import { useMutation } from "@tanstack/react-query";

import { loginUserService } from "../services/service-login-user";

// Runs login request and returns authenticated user payload.
export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUserService,
  });
};
