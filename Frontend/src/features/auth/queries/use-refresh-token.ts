import { useMutation } from '@tanstack/react-query'

import { refreshTokenService } from '../services/service-refresh-token'
import type { RefreshTokenResponse } from '../types/auth-query-types'

// Requests fresh auth cookies when only refresh session is alive.
export const useRefreshToken = () => {
  return useMutation<RefreshTokenResponse, Error, void>({
    mutationFn: refreshTokenService
  })
}

