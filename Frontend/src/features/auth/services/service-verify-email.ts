import { verifyEmailApi } from '../api/api-verify-email'
import type { VerifyEmailPayload, VerifyEmailResponse } from '../types/auth-query-types'

// Passes otp verification payload to api layer.
export const verifyEmailService = (
  payload: VerifyEmailPayload
): Promise<VerifyEmailResponse> => {
  return verifyEmailApi(payload)
}

