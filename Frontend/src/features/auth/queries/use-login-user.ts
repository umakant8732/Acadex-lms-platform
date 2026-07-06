import { useMutation } from '@tanstack/react-query'

import { loginUserService } from '../services/service-login-user'
import type { LoginPayload, AuthUserResponse } from '../types/auth-query-types'

// Runs login request and returns authenticated user payload.
export const useLoginUser = () => {
  return useMutation<AuthUserResponse, Error, LoginPayload>({
    mutationFn: loginUserService
  })
}

