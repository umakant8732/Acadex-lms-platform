import { z } from 'zod'

export const registerSchema = z.object({
  fullName: z.string().trim().min(3, 'Full name is required'),

  email: z.email('Invalid email').trim().toLowerCase(),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password cannot exceed 20 characters')
})
