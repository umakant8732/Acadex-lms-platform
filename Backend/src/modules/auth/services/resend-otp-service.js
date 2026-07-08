import ApiError from '../../../utils/api-error.js'
import { findUserByEmail } from '../repositories/find-user-by-email-repository.js'
import { sendOTPToUser } from './send-otp-to-user-service.js'

export const resentOTPService = async email => {
  const user = await findUserByEmail(email)

  if (!user) {
    throw new ApiError(404, 'User not found')
  }

  if (user.isEmailVerified) {
    throw new ApiError(400, 'Email already verified')
  }

  await sendOTPToUser(email)

  return { 
    message: 'OTP send successfully',
    expiresIn : 300 //
   }
}
