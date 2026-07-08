import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { useRegisterUser } from '../queries/use-register-user'
import { saveVerificationEmail, saveVerificationOtpExpiry } from '../services/auth-storage'
import { registerSchema } from '../validations/register-schema'
import { showError, showSuccess } from '../../../shared/utils/toast'
import { getZodErrors } from '../../../shared/utils/zod.js'
import type {
  AuthApiError,
  AuthFieldErrors,
  RegisterFormValues,
  RegisterPageHookResult
} from '../types/auth-page-hook-types'

const initialRegisterValues: RegisterFormValues = {
  fullName: '',
  email: '',
  password: ''
}

// Handles register form state and verification-email flow.
export const useRegisterPage = (): RegisterPageHookResult => {
  const navigate = useNavigate()
  const registerMutation = useRegisterUser()

  const [formData, setFormData] = useState<RegisterFormValues>(initialRegisterValues)
  const [errors, setErrors] = useState<AuthFieldErrors<'fullName' | 'email' | 'password'>>({})

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const fieldName = name as keyof RegisterFormValues

    setFormData(prev => ({ ...prev, [fieldName]: value }))

    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }))
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const result = registerSchema.safeParse(formData)

    if (!result.success) {
      setErrors(
        getZodErrors(result.error) as AuthFieldErrors<'fullName' | 'email' | 'password'>
      )
      return
    }

    try {
      setErrors({})

      const response = await registerMutation.mutateAsync(result.data)

      saveVerificationEmail(response.data.email)
      if (response.data.expiresIn) {
        saveVerificationOtpExpiry(response.data.expiresIn)
      }
      showSuccess(response.message)
      navigate('/auth/verify-otp')
    } catch (error) {
      const apiError = error as AuthApiError
      showError(apiError.response?.data?.message || 'Registration failed')
    }
  }

  return {
    formData,
    errors,
    isSubmitting: registerMutation.isPending,
    handleChange,
    handleSubmit
  }
}


