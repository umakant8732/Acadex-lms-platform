import { useMutation } from '@tanstack/react-query'
import { forgotPasswordService } from '../services/service-forgot-password'
import { resetPasswordService } from '../services/service-reset-password'
import type { ForgotPasswordPayload, ResetPasswordPayload, AuthMessageResponse } from '../types/auth-query-types'

// Hook to trigger forgot-password request
export const useForgotPassword = () => {
  return useMutation<AuthMessageResponse, Error, ForgotPasswordPayload>({
    mutationFn: forgotPasswordService
  })
}

// Hook to trigger reset-password request
export const useResetPassword = () => {
  return useMutation<AuthMessageResponse, Error, ResetPasswordPayload>({
    mutationFn: resetPasswordService
  })
}
