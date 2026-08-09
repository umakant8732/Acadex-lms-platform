import api from "@/shared/services/axios";

// Sends login form data and returns authenticated user response.
export const loginUserApi = async (payload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};
