import redisClient from '../../../config/redis.js'
import { logger } from '../../../utils/logger.js'

const OTP_EXPIRY = 300

export const saveOTP = async (email, otp) => {
  //KEY WILL BE OTP:USER-EMAIL
  await redisClient.set(`otp:${email}`, otp, { EX: OTP_EXPIRY })
  logger.info('OTP saved to redis server')
}

export const getOTP = async email => {
  return await redisClient.get(`otp:${email}`)
}

export const deleteOTP = async email => {
  await redisClient.del(`otp:${email}`)
}
