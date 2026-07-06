import { refreshTokenApi } from '../api/api-refresh-token'
import type { RefreshTokenResponse } from '../types/auth-query-types'

// Requests refreshed auth cookies from api layer.
export const refreshTokenService = (): Promise<RefreshTokenResponse> => {
  return refreshTokenApi()
}

