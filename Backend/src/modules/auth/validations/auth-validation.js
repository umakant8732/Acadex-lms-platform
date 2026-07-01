import { z } from 'zod'

export const registerSchema = z.object({
  fullName: z.string().trim().min(3, 'Full name must be at least 3 characters'),

  email: z.string().trim().toLowerCase().email('Invalid email'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password cannot exceed 20 characters')
})

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email('Invalid email'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password cannot exceed 20 characters')
})

export const verifyEmailSchema = z.object({
  email: z.string().trim().toLowerCase().email('Invalid email'),

  otp: z.string().trim().length(6, 'OTP must be 6 digits')
})

export const resendOTPSchema = z.object({
  email: z.string().trim().toLowerCase().email('Invalid email')
})

export const refreshTokenSchema = z.object({
  refreshToken: z.string().trim().min(1, 'Refresh token is required')
})

export const forgotPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email('Invalid email')
})

export const resetPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email('Invalid email'),

  otp: z.string().trim().length(6, 'OTP must be 6 digits'),

  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password cannot exceed 20 characters')
})

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(8, 'Password must be at least 8 character')
    .max(20, 'Password cannot exceed 20 characters'),

  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password cannot exceed 20 characters')
})
