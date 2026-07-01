import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useVerifyEmail } from '../queries/use-verify-email.js'
import {
  clearVerificationEmail,
  getVerificationEmail
} from '../services/auth-storage.js'
import { verifyEmailSchema } from '../validations/verify-email-schema.js'
import { showError, showSuccess } from '../../../shared/utils/toast.js'
import { getZodErrors } from '../../../shared/utils/zod.js'

export const useVerifyOtpPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const verifyMutation = useVerifyEmail()

  const [otp, setOtp] = useState('')
  const [errors, setErrors] = useState({})

  const email = getVerificationEmail()

  useEffect(() => {
    if (!email) {
      navigate(`/auth${location.search}`)
    }
  }, [email, location.search, navigate])

  const handleOtpChange = event => {
    const value = event.target.value

    setOtp(value)

    if (errors.otp && value.length === 6) {
      setErrors(prev => ({
        ...prev,
        otp: ''
      }))
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()

    const result = verifyEmailSchema.safeParse({ email, otp })

    if (!result.success) {
      setErrors(getZodErrors(result.error))
      return
    }

    try {
      setErrors({})

      const response = await verifyMutation.mutateAsync(result.data)

      clearVerificationEmail()
      showSuccess(response.message)
      navigate(`/auth${location.search}`)
    } catch (error) {
      showError(error?.response?.data?.message || 'OTP verification failed')
    }
  }

  return {
    otp,
    errors,
    isSubmitting: verifyMutation.isPending,
    handleOtpChange,
    handleSubmit
  }
}
