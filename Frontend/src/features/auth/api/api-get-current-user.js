import api from "../../../shared/services/axios";

// Fetches current authenticated user details from backend.
export const getCurrentUserApi = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
