import { resendOtpApi } from "../api/api-resend-otp";

export const resendOtpService = async (payload) => {
  return await resendOtpApi(payload);
};
