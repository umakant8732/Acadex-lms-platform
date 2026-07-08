import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useVerifyEmail } from '../queries/use-verify-email'
import {
  clearVerificationEmail,
  clearVerificationOtpExpiry,
  getVerificationEmail,
  getVerificationOtpExpiry,
  saveVerificationOtpExpiry
} from '../services/auth-storage'
import { verifyEmailSchema } from '../validations/verify-email-schema'
import { showError, showSuccess } from '../../../shared/utils/toast'
import { getZodErrors } from '../../../shared/utils/zod.js'
import type {
  AuthApiError,
  AuthFieldErrors,
  VerifyOtpPageHookResult
} from '../types/auth-page-hook-types'
import { useResendOtp } from '../queries/use-resend-otp'

// Handles OTP input state and email-verification submit flow.
export const useVerifyOtpPage = (): VerifyOtpPageHookResult => {
  const location = useLocation()
  const navigate = useNavigate()
  const verifyMutation = useVerifyEmail()
  const resendMutation = useResendOtp()

  const [otp, setOtp] = useState('')
  const [errors, setErrors] = useState<AuthFieldErrors<'otp'>>({})

  const [timeLeft, setTimeLeft] = useState<number>(0)
  const email = getVerificationEmail() as string | null

  useEffect(() => {
    if (!email) {
      navigate(`/auth${location.search}`)
    }
  }, [email, location.search, navigate])

  //count down timer logic
  useEffect(() => {
    const expiryTime = getVerificationOtpExpiry()
    if (!expiryTime) return

    const calculateTimeLeft = () => {
      const difference = expiryTime - Date.now()
      return Math.max(0, Math.floor(difference / 1000))
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft()

      setTimeLeft(remaining)

      if (remaining <= 0) {
        clearInterval(timer)
      }
    }, 1000)


    return () => clearInterval(timer)
  },[timeLeft === 0])

  const handleOtpChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setOtp(value)

    if (errors.otp && value.length === 6) {
      setErrors(prev => ({
        ...prev,
        otp: ''
      }))
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const result = verifyEmailSchema.safeParse({ email, otp })

    if (!result.success) {
      setErrors(getZodErrors(result.error) as AuthFieldErrors<'otp'>)
      return
    }

    try {
      setErrors({})

      const response = await verifyMutation.mutateAsync(result.data)

      clearVerificationEmail()
      clearVerificationOtpExpiry()
      showSuccess(response.message)
      navigate(`/auth${location.search}`)
    } catch (error) {
      const apiError = error as AuthApiError
      showError(apiError.response?.data?.message || 'OTP verification failed')
    }
  }


  //handle resend otp

  const handleResendOtp = async () => {
    if(!email) return 
    
    try {
      const response = await resendMutation.mutateAsync({email})
      const expiresIn = response.data?.expiresIn || 300
      saveVerificationOtpExpiry(expiresIn)

      //update local state timer immediately
      setTimeLeft(expiresIn)
      showSuccess(response.message || 'New to send to your email')
    } catch (error) {
      const apiError = error as AuthApiError
      showError(apiError.response?.data?.message || 'Failed to resend OTP')
    }
  }


  return {
    otp,
    errors,
    isSubmitting: verifyMutation.isPending,
    timeLeft,
    isResending: resendMutation.isPending,

    handleOtpChange,
    handleSubmit,
    handleResendOtp
  }
}


