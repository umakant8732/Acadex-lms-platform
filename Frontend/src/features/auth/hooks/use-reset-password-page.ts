import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useResetPassword } from '../queries/use-forgot-reset-password'
import { clearVerificationEmail, getVerificationEmail } from '../services/auth-storage'
import { resetPasswordSchema } from '../validations/reset-password-schema'
import { showError, showSuccess } from '../../../shared/utils/toast'
import { getZodErrors } from '../../../shared/utils/zod.js'
import type {
  AuthApiError,
  AuthFieldErrors,
  ResetPasswordPageHookResult
} from '../types/auth-page-hook-types'

const initialFormValues = {
  otp: '',
  newPassword: '',
  confirmPassword: ''
}

// Handles Reset Password form state, validation, and submission
export const useResetPasswordPage = (): ResetPasswordPageHookResult => {
  const location = useLocation()
  const navigate = useNavigate()
  const resetPasswordMutation = useResetPassword()

  const [formData, setFormData] = useState(initialFormValues)
  const [errors, setErrors] = useState<AuthFieldErrors<'otp' | 'newPassword' | 'confirmPassword'>>({})

  const email = getVerificationEmail()

  useEffect(() => {
    if (!email) {
      navigate(`/auth/forgot-password${location.search}`)
    }
  }, [email, location.search, navigate])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const fieldName = name as keyof typeof initialFormValues

    setFormData(prev => ({ ...prev, [fieldName]: value }))

    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }))
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validationResult = resetPasswordSchema.safeParse({
      email,
      ...formData
    })

    if (!validationResult.success) {
      setErrors(
        getZodErrors(validationResult.error) as AuthFieldErrors<
          'otp' | 'newPassword' | 'confirmPassword'
        >
      )
      return
    }

    try {
      setErrors({})

      const response = await resetPasswordMutation.mutateAsync({
        email: email!,
        otp: validationResult.data.otp,
        newPassword: validationResult.data.newPassword
      })

      clearVerificationEmail()
      showSuccess(response.message || 'Password reset successfully')
      navigate(`/auth${location.search}`)
    } catch (error) {
      const apiError = error as AuthApiError
      showError(apiError.response?.data?.message || 'Failed to reset password')
    }
  }

  return {
    formData,
    errors,
    isSubmitting: resetPasswordMutation.isPending,
    handleChange,
    handleSubmit
  }
}
