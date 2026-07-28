import { verifyEmailApi } from "../api/api-verify-email";

// Passes otp verification payload to api layer.
export const verifyEmailService = (payload) => {
  return verifyEmailApi(payload);
};
