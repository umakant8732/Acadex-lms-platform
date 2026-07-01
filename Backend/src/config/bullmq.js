import { URL } from 'node:url'

import { env } from './env.js'

const redisUrl = new URL(env.REDIS_URL)

const redisPort = redisUrl.port ? Number(redisUrl.port) : 6379

// BullMQ uses same Redis instance as main redis client.
export const bullMQConnection = {
  host: redisUrl.hostname,
  port: redisPort,
  username: redisUrl.username || undefined,
  password: redisUrl.password || undefined,
  tls: redisUrl.protocol === 'rediss:' ? {} : undefined
}
