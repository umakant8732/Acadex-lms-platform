import { loginUserApi } from "../api/api-login-user";

// Passes login payload to api layer and returns auth response.
export const loginUserService = (payload) => {
  return loginUserApi(payload);
};
