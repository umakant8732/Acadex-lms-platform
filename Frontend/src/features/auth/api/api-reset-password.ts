import apiClient from '../../../shared/services/axios'
import type { ResetPasswordPayload, AuthMessageResponse } from '../types/auth-query-types'

// Calls backend to reset the user's password with email, otp, and newPassword
export const resetPasswordApi = async (payload: ResetPasswordPayload): Promise<AuthMessageResponse> => {
  const response = await apiClient.post<AuthMessageResponse>('/auth/reset-password', payload)
  return response.data
}
