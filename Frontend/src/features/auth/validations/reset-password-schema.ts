import { z } from 'zod'

export const resetPasswordSchema = z
  .object({
    email: z.string().trim().toLowerCase().email('Please enter a valid email'),
    otp: z.string().trim().length(6, 'OTP must be 6 digits'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password cannot exceed 20 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password')
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })