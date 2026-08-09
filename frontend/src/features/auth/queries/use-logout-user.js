import { useMutation } from "@tanstack/react-query";

import { logoutUserService } from "../services/service-logout-user";

// Ends current session and clears server-side auth cookies.
export const useLogoutUser = () => {
  return useMutation({
    mutationFn: logoutUserService,
  });
};
