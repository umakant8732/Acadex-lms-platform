import { logoutUserApi } from "../api/api-logout-user";

// Ends current session through api layer.
export const logoutUserService = () => {
  return logoutUserApi();
};
