import { createClient } from 'redis'

import { env } from './env.js'

import { logger } from '../utils/logger.js'

const redisClient = createClient({
  url: env.REDIS_URL
})

redisClient.on('connect', () => {
  logger.info('✅ Redis Connected')
})

redisClient.on('error', error => {
  logger.error(`Redis Error: ${error.message}`)
})

export const connectRedis = async () => {
  try {
    await redisClient.connect()
  } catch (error) {
    logger.error(`Redis Connection Failed: ${error.message}`)

    process.exit(1)
  }
}

export default redisClient
