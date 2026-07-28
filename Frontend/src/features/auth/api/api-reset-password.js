import apiClient from "../../../shared/services/axios";

// Calls backend to reset the user's password with email, otp, and newPassword
export const resetPasswordApi = async (payload) => {
  const response = await apiClient.post("/auth/reset-password", payload);
  return response.data;
};
