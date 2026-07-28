import { forgotPasswordApi } from "../api/api-forgot-password";

export const forgotPasswordService = async (payload) => {
  return await forgotPasswordApi(payload);
};
