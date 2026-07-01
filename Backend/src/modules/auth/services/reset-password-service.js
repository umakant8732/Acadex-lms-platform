import ApiError from '../../../utils/api-error.js'
import { deleteOTP, getOTP } from '../redis/otp-redis.js'
import { findUserByEmail } from '../repositories/find-user-by-email-repository.js'
import { saveUser } from '../repositories/save-user-repository.js'

export const resetPasswordService = async (email, otp, newPassword) => {
  const storedOTP = await getOTP(email)


  if (!storedOTP || storedOTP !== otp) {
    throw new ApiError(400, 'Invalid OTP')
  }

  const user = await findUserByEmail(email)

  if (!user) {
    throw new ApiError(404, 'User not found')
  }

  user.password = newPassword
  user.passwordChangedAt = new Date()

  await saveUser(user)

  await deleteOTP(email)

  return { message: 'Password reset successful' }
}
