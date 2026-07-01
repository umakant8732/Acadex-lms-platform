import { Queue } from 'bullmq'

import { bullMQConnection } from '../../../config/bullmq.js'

export const AUTH_EMAIL_QUEUE_NAME = 'auth-email-queue'

export const AUTH_EMAIL_JOBS = Object.freeze({
  VERIFY_EMAIL: 'verify-email',
  FORGOT_PASSWORD: 'forgot-password'
})

export const authEmailQueue = new Queue(AUTH_EMAIL_QUEUE_NAME, {
  connection: bullMQConnection
})
