import { Worker } from 'bullmq'

import { bullMQConnection } from '../../../config/bullmq.js'
import { forgotPasswordTemplate } from '../../../templates/forgot-password-template.js'
import { verifyEmailTemplate } from '../../../templates/verify-email-template.js'
import { invoiceEmailTemplate } from '../../../templates/invoice-email-template.js'
import { logger } from '../../../utils/logger.js'
import { sendMail } from '../../../utils/mail.js'
import {
  AUTH_EMAIL_JOBS,
  AUTH_EMAIL_QUEUE_NAME
} from '../queues/auth-email-queue.js'

const sendVerificationEmail = async ({ email, otp }) => {
  await sendMail({
    to: email,
    subject: 'Verify Your Email',
    html: verifyEmailTemplate(otp)
  })

  logger.info(`Verification Email Sent To ${email}`)
}

const sendForgotPasswordEmail = async ({ email, otp }) => {
  await sendMail({
    to: email,
    subject: 'Reset Your Password',
    html: forgotPasswordTemplate(otp)
  })

  logger.info(`Password Reset Email Sent To ${email}`)
}

const sendInvoiceEmail = async ({
  email,
  fullName,
  courseTitle,
  price,
  providerPaymentId,
  receipt,
  paidAt
}) => {
  await sendMail({
    to: email,
    subject: `Your Invoice for ${courseTitle} - Acadex`,
    html: invoiceEmailTemplate({
      fullName,
      courseTitle,
      price,
      providerPaymentId,
      receipt,
      paidAt
    })
  })

  logger.info(`Invoice Email Sent To ${email}`)
}

const authEmailJobHandlers = {
  [AUTH_EMAIL_JOBS.VERIFY_EMAIL]: sendVerificationEmail,
  [AUTH_EMAIL_JOBS.FORGOT_PASSWORD]: sendForgotPasswordEmail,
  [AUTH_EMAIL_JOBS.SEND_INVOICE]: sendInvoiceEmail
}

export const authEmailWorker = new Worker(
  AUTH_EMAIL_QUEUE_NAME,
  async job => {
    logger.info(`Processing Auth Email Job: ${job.name}`)

    const handler = authEmailJobHandlers[job.name]

    if (!handler) {
      logger.warn(`Unknown Auth Email Job: ${job.name}`)
      return
    }

    await handler(job.data)
  },
  {
    connection: bullMQConnection
  }
)

authEmailWorker.on('completed', job => {
  logger.info(`Auth Email Job Completed: ${job.name}`)
})

authEmailWorker.on('failed', (job, error) => {
  logger.error(`Auth Email Job Failed: ${job?.name} - ${error.message}`)
})

authEmailWorker.on('error', error => {
  logger.error(`Auth Email Worker Error: ${error.message}`)
})
