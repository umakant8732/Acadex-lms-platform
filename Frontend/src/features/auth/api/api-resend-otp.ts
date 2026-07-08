import apiClient from '../../../shared/services/axios'

import type { ResendOtpPayload, ResendOtpResponse } from '../types/auth-query-types'

//calls backend to resend verification otp
export const resendOtpApi = async (payload: ResendOtpPayload): Promise<ResendOtpResponse> => {
    const response = await apiClient.post<ResendOtpResponse>('/auth/resend-otp', payload)
    return response.data
}
