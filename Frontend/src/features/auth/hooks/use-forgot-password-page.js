import { useState } from 'react'

import { forgotPasswordSchema } from '../validations/forgot-password-schema.js'
import { getZodErrors } from '../../../shared/utils/zod.js'

export const useForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})

  const handleEmailChange = event => {
    setEmail(event.target.value)

    if (errors.email) {
      setErrors(prev => ({
        ...prev,
        email: ''
      }))
    }
  }

  const handleSubmit = event => {
    event.preventDefault()

    const result = forgotPasswordSchema.safeParse({ email })

    if (!result.success) {
      setErrors(getZodErrors(result.error))
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
