import api from "../../../shared/services/axios";

// Calls logout endpoint and clears current session on backend.
export const logoutUserApi = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};
