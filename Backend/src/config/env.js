import dotenv from 'dotenv'

import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  PORT: z.string(),

  NODE_ENV: z.enum([
    'development',
    'production'
  ]),

  MONGO_URI: z.string(),

  JWT_ACCESS_SECRET: z.string(),

  JWT_REFRESH_SECRET: z.string(),

  ACCESS_TOKEN_EXPIRES_IN: z.string(),

  REFRESH_TOKEN_EXPIRES_IN: z.string(),

  CLIENT_URL: z.string(),

  REDIS_URL: z.string(),

  REDIS_HOST: z.string(),

  REDIS_PORT: z.string(),

  EMAIL_USER: z.string(),

  EMAIL_PASS: z.string(),

  AWS_REGION: z.string(),

  AWS_ACCESS_KEY_ID: z.string(),

  AWS_SECRET_ACCESS_KEY: z.string(),

  AWS_S3_BUCKET_NAME: z.string(),

  AWS_S3_UPLOAD_URL_EXPIRES_IN: z.string(),

  RAZORPAY_KEY_ID: z.string(),

  RAZORPAY_KEY_SECRET: z.string(),

  RAZORPAY_WEBHOOK_SECRET: z.string(),

  CLOUDFRONT_DOMAIN: z.string(),

  CLOUDFRONT_KEY_PAIR_ID: z.string(),

  CLOUDFRONT_PRIVATE_KEY_PATH: z.string(),

  CLOUDFRONT_URL_EXPIRES_IN: z.string()
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error(
    'Invalid environment variables:',
    parsedEnv.error.flatten().fieldErrors
  )

  process.exit(1)
}

export const env = parsedEnv.data
