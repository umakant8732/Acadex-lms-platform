import { resetPasswordApi } from '../api/api-reset-password'
import type { ResetPasswordPayload, AuthMessageResponse } from '../types/auth-query-types'

export const resetPasswordService = async (payload: ResetPasswordPayload): Promise<AuthMessageResponse> => {
  return await resetPasswordApi(payload)
}
