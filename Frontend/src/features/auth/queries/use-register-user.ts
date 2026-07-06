import { useMutation } from '@tanstack/react-query'

import { registerUserService } from '../services/service-register-user'
import type { RegisterPayload, RegisterUserResponse } from '../types/auth-query-types'

// Runs register request and returns verification-email payload.
export const useRegisterUser = () => {
  return useMutation<RegisterUserResponse, Error, RegisterPayload>({
    mutationFn: registerUserService
  })
}

