import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useLoginUser } from '../queries/use-login-user'
import { saveVerificationEmail } from '../services/auth-storage'
import { setUser, useAppDispatch } from '../../../app/store'
import { loginSchema } from '../validations/login-schema'
import { getPostLoginRedirectPath } from '../../../shared/utils/auth-redirect.js'
import { showError, showSuccess } from '../../../shared/utils/toast'
import { getZodErrors } from '../../../shared/utils/zod.js'
import type {
  AuthApiError,
  AuthFieldErrors,
  LoginFormValues,
  LoginPageHookResult
} from '../types/auth-page-hook-types'

const initialLoginValues: LoginFormValues = {
  email: '',
  password: ''
}

// Handles login form state, validation, and redirect flow.
export const useLoginPage = (): LoginPageHookResult => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const loginMutation = useLoginUser()

  const [formData, setFormData] = useState<LoginFormValues>(initialLoginValues)
  const [errors, setErrors] = useState<AuthFieldErrors<'email' | 'password'>>({})

  const redirectPath = new URLSearchParams(location.search).get('redirect')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const fieldName = name as keyof LoginFormValues

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

    const result = loginSchema.safeParse(formData)

    if (!result.success) {
      setErrors(getZodErrors(result.error) as AuthFieldErrors<'email' | 'password'>)
      return
    }

    try {
      const response = await loginMutation.mutateAsync(result.data)

      dispatch(setUser(response.data))

      navigate(
        getPostLoginRedirectPath({
          role: response.data.role,
          redirectPath
        })
      )

      showSuccess(response.message)
    } catch (error) {
      const apiError = error as AuthApiError

      if (apiError.response?.status === 403) {
        // Save email so verify page knows which account OTP belongs to.
        saveVerificationEmail(result.data.email)
        navigate(`/auth/verify-otp${location.search}`)
        showError(apiError.response?.data?.message || 'Please verify your email first')
        return
      }

      showError(apiError.response?.data?.message || 'Login failed')
    }
  }

  return {
    formData,
    errors,
    isSubmitting: loginMutation.isPending,
    handleChange,
    handleSubmit
  }
}

