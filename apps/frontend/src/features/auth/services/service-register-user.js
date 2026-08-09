import { registerUserApi } from "../api/api-register-user";

// Passes register payload to api layer and returns verification data.
export const registerUserService = (payload) => {
  return registerUserApi(payload);
};
