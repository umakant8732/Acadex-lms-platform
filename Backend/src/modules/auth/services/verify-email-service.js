import ApiError from '../../../utils/api-error.js'
import { deleteOTP, getOTP } from '../redis/otp-redis.js'
import { findUserByEmail } from '../repositories/find-user-by-email-repository.js'
import { verifyUserEmail } from '../repositories/verify-user-email-repository.js'

export const verifyEmailService = async (email, otp) => {
  const user = await findUserByEmail(email)

  if (!user) {
    throw new ApiError(404, 'User not found')
  }

  if (user.isEmailVerified) {
    throw new ApiError(400, 'Email already verified')
  }

  const storedOTP = await getOTP(email)

  if (!storedOTP) {
    throw new ApiError(400, 'OTP expired or not found')
  }

  if (storedOTP !== otp) {
    throw new ApiError(400, 'Invalid OTP')
  }

  const verifiedUser = await verifyUserEmail(user._id)

  await deleteOTP(email)

  return verifiedUser
}
