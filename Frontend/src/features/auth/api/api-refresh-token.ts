import api from '../../../shared/services/axios.js'
import type { RefreshTokenResponse } from '../types/auth-query-types'

// Requests fresh auth cookies from backend refresh endpoint.
export const refreshTokenApi = async (): Promise<RefreshTokenResponse> => {
  const response = await api.post<RefreshTokenResponse>('/auth/refresh-token')
  return response.data
}
