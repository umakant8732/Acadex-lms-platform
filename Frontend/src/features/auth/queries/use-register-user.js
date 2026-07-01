import { useMutation } from '@tanstack/react-query'

import { registerUserService } from '../services/service-register-user.js'

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUserService
  })
}
