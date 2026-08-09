import { useNavigate } from "react-router-dom";

import { useLogoutUser } from "../queries/use-logout-user";
import { clearUser, useAppDispatch } from "../../../app/store";
import { showError, showSuccess } from "@/shared/utils/toast";

// Runs logout mutation and clears auth state after success.
export const useAuthLogout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logoutMutation = useLogoutUser();

  const handleLogout = async () => {
    try {
      const response = await logoutMutation.mutateAsync();

      dispatch(clearUser());
      showSuccess(response.message);
      navigate("/auth");
    } catch (error) {
      const apiError = error;
      showError(apiError.response?.data?.message || "Logout failed");
    }
  };

  return {
    handleLogout,
    isPending: logoutMutation.isPending,
  };
};
