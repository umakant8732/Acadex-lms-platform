import nodemailer from 'nodemailer'

import { env } from '../config/env.js'

import { logger } from './logger.js'

const transporter =
  nodemailer.createTransport({
    service: 'gmail',

    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASS
    }
  })

export const sendMail = async ({
  to,
  subject,
  html
}) => {
  try {

    await transporter.sendMail({
      from: env.EMAIL_USER,
      to,
      subject,
      html
    })

    logger.info(
      `Email sent to ${to}`
    )

  } catch (error) {

    logger.error(
      `Email Error: ${error.message}`
    )

    throw error
  }
}