import ApiError from '../../../utils/api-error.js'
import { generateOTP } from '../../../utils/generate-otp.js'
import { sendForgotPasswordJob } from '../jobs/auth-email-job.js'
import { saveOTP } from '../redis/otp-redis.js'
import { findUserByEmail } from '../repositories/find-user-by-email-repository.js'

export const forgotPasswordService = async email => {
  const user = await findUserByEmail(email)

  if (!user) {
    throw new ApiError(404, 'User not found')
  }

  const otp = generateOTP()

  await saveOTP(email, otp)

  await sendForgotPasswordJob(email, otp)

  return { message: 'Password reset OTP sent' }
}
