import api from "@/shared/services/axios";

// Sends otp verification payload and returns verify response.
export const verifyEmailApi = async (payload) => {
  const response = await api.post("/auth/verify-email", payload);
  return response.data;
};
