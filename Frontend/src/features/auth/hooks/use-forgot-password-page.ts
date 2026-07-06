import { useState, type ChangeEvent, type FormEvent } from 'react'

import { forgotPasswordSchema } from '../validations/forgot-password-schema'
import { getZodErrors } from '../../../shared/utils/zod.js'
import type {
  AuthFieldErrors,
  ForgotPasswordPageHookResult
} from '../types/auth-page-hook-types'

// Keeps forgot-password form state and local validation.
export const useForgotPasswordPage = (): ForgotPasswordPageHookResult => {
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const result = forgotPasswordSchema.safeParse({ email })

    if (!result.success) {
      setErrors(getZodErrors(result.error) as AuthFieldErrors<'email'>)
      return
    }

    setErrors({})
  }

  return {
    email,
    errors,
    handleEmailChange,
    handleSubmit
  }
}

