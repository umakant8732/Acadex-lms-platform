import { resetPasswordApi } from "../api/api-reset-password";

export const resetPasswordService = async (payload) => {
  return await resetPasswordApi(payload);
};
