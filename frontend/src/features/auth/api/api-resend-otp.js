import apiClient from "@/shared/services/axios";

//calls backend to resend verification otp
export const resendOtpApi = async (payload) => {
  const response = await apiClient.post("/auth/resend-otp", payload);
  return response.data;
};
