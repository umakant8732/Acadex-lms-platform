import { useMutation } from '@tanstack/react-query'

import { verifyEmailService } from '../services/service-verify-email.js'

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmailService
  })
}
