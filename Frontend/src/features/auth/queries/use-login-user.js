import { useMutation } from '@tanstack/react-query'

import { loginUserService } from '../services/service-login-user.js'

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUserService
  })
}
