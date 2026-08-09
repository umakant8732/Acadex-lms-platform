import { useMutation } from "@tanstack/react-query";

import { refreshTokenService } from "../services/service-refresh-token";

// Requests fresh auth cookies when only refresh session is alive.
export const useRefreshToken = () => {
  return useMutation({
    mutationFn: refreshTokenService,
  });
};
