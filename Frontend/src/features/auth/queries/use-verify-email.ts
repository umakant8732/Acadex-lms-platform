import { useMutation } from '@tanstack/react-query'

import { verifyEmailService } from '../services/service-verify-email'
import type { VerifyEmailPayload, VerifyEmailResponse } from '../types/auth-query-types'

// Verifies OTP and completes email verification flow.
export const useVerifyEmail = () => {
  return useMutation<VerifyEmailResponse, Error, VerifyEmailPayload>({
    mutationFn: verifyEmailService
  })
}

