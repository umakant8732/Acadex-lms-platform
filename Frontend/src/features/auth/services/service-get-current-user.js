import { getCurrentUserApi } from "../api/api-get-current-user";

// Loads current authenticated user from api layer.
export const getCurrentUserService = () => {
  return getCurrentUserApi();
};
