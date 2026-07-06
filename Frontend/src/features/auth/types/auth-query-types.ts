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

export interface RegisterUserResponse extends AuthMessageResponse {
  data: {
    email: string
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
