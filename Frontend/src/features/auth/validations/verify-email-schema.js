import {z} from 'zod'

export const verifyEmailSchema = z.object({

    email : z
    .email('Invalid Email')
    .trim()
    .toLowerCase(),

    otp : z
    .string()
    .trim()
    .length(6, 'OTP must be 6 digit')

})