import type { ChangeEvent, FormEvent } from 'react'
import { z } from 'zod'

import { forgotPasswordSchema } from '../validations/forgot-password-schema'
import { loginSchema } from '../validations/login-schema'
import { registerSchema } from '../validations/register-schema'
import { verifyEmailSchema } from '../validations/verify-email-schema'

export type AuthFieldErrors<TFields extends string> = Partial<Record<TFields, string>>

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
export type VerifyOtpFormValues = z.infer<typeof verifyEmailSchema>

export interface AuthApiError {
  response?: {
    status?: number
    data?: {
      message?: string
    }
  }
}

export interface LoginPageHookResult {
  formData: LoginFormValues
  errors: AuthFieldErrors<'email' | 'password'>
  isSubmitting: boolean
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>
}

export interface RegisterPageHookResult {
  formData: RegisterFormValues
  errors: AuthFieldErrors<'fullName' | 'email' | 'password'>
  isSubmitting: boolean
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>
}

export interface ForgotPasswordPageHookResult {
  email: string
  errors: AuthFieldErrors<'email'>
  isSubmitting: boolean
  handleEmailChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>
}

export interface VerifyOtpPageHookResult {
  otp: string
  errors: AuthFieldErrors<'otp'>
  isSubmitting: boolean
  timeLeft : number
  isResending: boolean
  handleOtpChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>
  handleResendOtp: () => Promise<void>
}

export interface ResetPasswordPageHookResult {
  formData: {
    otp: string
    newPassword: string
    confirmPassword: string
  }
  errors: AuthFieldErrors<'otp' | 'newPassword' | 'confirmPassword'>
  isSubmitting: boolean
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void | Promise<void>
}


export interface AuthLogoutHookResult {
  handleLogout: () => Promise<void>
  isPending: boolean
}

