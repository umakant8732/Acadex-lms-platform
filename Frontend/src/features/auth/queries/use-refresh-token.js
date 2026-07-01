import { useMutation } from '@tanstack/react-query'

import { refreshTokenService } from '../services/service-refresh-token.js'

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: refreshTokenService
  })
}
