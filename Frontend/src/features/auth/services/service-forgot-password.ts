import { forgotPasswordApi } from '../api/api-forgot-password'
import type { ForgotPasswordPayload, AuthMessageResponse } from '../types/auth-query-types'

export const forgotPasswordService = async (payload: ForgotPasswordPayload): Promise<AuthMessageResponse> => {
  return await forgotPasswordApi(payload)
}
