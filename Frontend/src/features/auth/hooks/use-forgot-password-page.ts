import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { forgotPasswordSchema } from '../validations/forgot-password-schema'
import { useForgotPassword } from '../queries/use-forgot-reset-password'
import { saveVerificationEmail } from '../services/auth-storage'
import { showError, showSuccess } from '../../../shared/utils/toast'
import { getZodErrors } from '../../../shared/utils/zod.js'
import type {
  AuthApiError,
  AuthFieldErrors,
  ForgotPasswordPageHookResult
} from '../types/auth-page-hook-types'

// Keeps forgot-password form state and local validation.
export const useForgotPasswordPage = (): ForgotPasswordPageHookResult => {
  const navigate = useNavigate()
  const forgotPasswordMutation = useForgotPassword()

  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<AuthFieldErrors<'email'>>({})

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)

    if (errors.email) {
      setErrors(prev => ({
        ...prev,
        email: ''
      }))
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const result = forgotPasswordSchema.safeParse({ email })

    if (!result.success) {
      setErrors(getZodErrors(result.error) as AuthFieldErrors<'email'>)
      return
    }

    try {
      setErrors({})

      const response = await forgotPasswordMutation.mutateAsync(result.data)

      // Save email for reset password screen
      saveVerificationEmail(email)
      showSuccess(response.message)
      navigate('/auth/reset-password')
    } catch (error) {
      const apiError = error as AuthApiError
      showError(apiError.response?.data?.message || 'Failed to send reset code')
    }
  }

  return {
    email,
    errors,
    isSubmitting: forgotPasswordMutation.isPending,
    handleEmailChange,
    handleSubmit
  }
}


