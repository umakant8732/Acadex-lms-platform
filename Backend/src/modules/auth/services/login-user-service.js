import ApiError from '../../../utils/api-error.js'
import { findUserByEmail } from '../repositories/find-user-by-email-repository.js'
import { resentOTPService } from './resend-otp-service.js'

export const loginService = async (email, password) => {
  const user = await findUserByEmail(email)

  if (!user) {
    throw new ApiError(401, 'Invalid email or password')
  }

  if (!user.isEmailVerified) {
    await resentOTPService(user.email)
    throw new ApiError(403, 'Please verify your email first')
  }

  const isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    throw new ApiError(401, 'Invalid email or password')
  }

  return { user }
}
