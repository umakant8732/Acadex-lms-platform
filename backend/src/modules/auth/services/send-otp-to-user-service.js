import { generateOTP } from '../../../shared/utils/generate-otp.js'
import { sendVerificationEmailJob } from '../../../jobs/auth-email-job.js'
import { saveOTP } from '../redis/otp-redis.js'

export const sendOTPToUser = async email => {
  const otp = generateOTP()

  await saveOTP(email, otp)

  await sendVerificationEmailJob(email, otp)
}
