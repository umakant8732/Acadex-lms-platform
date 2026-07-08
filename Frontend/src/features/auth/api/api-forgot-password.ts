import apiClient from '../../../shared/services/axios'
import type { ForgotPasswordPayload, AuthMessageResponse } from '../types/auth-query-types'

// Calls backend to start forgot-password OTP flow
export const forgotPasswordApi = async (payload: ForgotPasswordPayload): Promise<AuthMessageResponse> => {
  const response = await apiClient.post<AuthMessageResponse>('/auth/forgot-password', payload)
  return response.data
}
