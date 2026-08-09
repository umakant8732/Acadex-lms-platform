import api from "../../../shared/services/axios";

// Sends register form data and returns email verification response.
export const registerUserApi = async (payload) => {
  const response = await api.post("/auth/register", payload);
  return response.data;
};
