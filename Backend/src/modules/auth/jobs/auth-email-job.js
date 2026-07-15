import {
  AUTH_EMAIL_JOBS,
  authEmailQueue
} from '../queues/auth-email-queue.js'

const defaultEmailJobOptions = {
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: 5000
  },
  removeOnComplete: true,
  removeOnFail: 50
}

export const sendVerificationEmailJob = async (email, otp) => {
  return await authEmailQueue.add(
    AUTH_EMAIL_JOBS.VERIFY_EMAIL,
    {
      email,
      otp
    },
    defaultEmailJobOptions
  )
}

export const sendForgotPasswordJob = async (email, otp) => {
  return await authEmailQueue.add(
    AUTH_EMAIL_JOBS.FORGOT_PASSWORD,
    {
      email,
      otp
    },
    defaultEmailJobOptions
  )
}

export const sendInvoiceEmailJob = async ({
  email,
  fullName,
  courseTitle,
  price,
  providerPaymentId,
  receipt,
  paidAt
}) => {
  return await authEmailQueue.add(
    AUTH_EMAIL_JOBS.SEND_INVOICE,
    {
      email,
      fullName,
      courseTitle,
      price,
      providerPaymentId,
      receipt,
      paidAt
    },
    defaultEmailJobOptions
  )
}
