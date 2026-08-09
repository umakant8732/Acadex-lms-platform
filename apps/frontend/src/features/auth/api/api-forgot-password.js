import apiClient from "@/shared/services/axios";

// Calls backend to start forgot-password OTP flow
export const forgotPasswordApi = async (payload) => {
  const response = await apiClient.post("/auth/forgot-password", payload);
  return response.data;
};
