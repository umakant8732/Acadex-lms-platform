import api from "../../../shared/services/axios";

// Requests fresh auth cookies from backend refresh endpoint.
export const refreshTokenApi = async () => {
  const response = await api.post("/auth/refresh-token");
  return response.data;
};
