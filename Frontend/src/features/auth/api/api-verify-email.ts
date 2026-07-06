import api from '../../../shared/services/axios.js'
import type {
  VerifyEmailPayload,
  VerifyEmailResponse
} from '../types/auth-query-types'

// Sends otp verification payload and returns verify response.
export const verifyEmailApi = async (
  payload: VerifyEmailPayload
): Promise<VerifyEmailResponse> => {
  const response = await api.post<VerifyEmailResponse>(
    '/auth/verify-email',
    payload
  )
  return response.data
}
