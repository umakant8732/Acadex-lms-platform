import { z } from 'zod'
import type { AuthUser } from '../../../app/store'
import type {
  LoginFormValues,
  RegisterFormValues,
  VerifyOtpFormValues
} from './auth-page-hook-types'

export type LoginPayload = LoginFormValues
export type RegisterPayload = RegisterFormValues
export type VerifyEmailPayload = VerifyOtpFormValues

export interface AuthMessageResponse {
  success: boolean
  message: string
}

export interface AuthUserResponse extends AuthMessageResponse {
  data: AuthUser
}

export interface ResendOtpPayload {
  email: string
}

export interface ResendOtpResponse extends AuthMessageResponse {
  data?: { expiresIn?: number } | null
}



export interface RegisterUserResponse extends AuthMessageResponse {
  data: {
    email: string,
    expiresIn?: number //
  }
}

export interface RefreshTokenResponse extends AuthMessageResponse {
  data?: AuthUser | null
}

export interface LogoutUserResponse extends AuthMessageResponse {
  data?: null
}

export interface VerifyEmailResponse extends AuthMessageResponse {
  data?: null
}

export interface ForgotPasswordPayload {
  email : string
}

export interface ResetPasswordPayload {
  email : string,
  otp : string,
  newPassword: z.infer<typeof import('../validations/reset-password-schema').resetPasswordSchema>['newPassword']
}
