import { resendOtpApi } from "../api/api-resend-otp";
import type { ResendOtpPayload, ResendOtpResponse } from "../types/auth-query-types";

export const resendOtpService = async(payload: ResendOtpPayload): Promise<ResendOtpResponse> => {
    return await resendOtpApi(payload)
}