import { S3Client } from '@aws-sdk/client-s3'
import { NodeHttpHandler } from '@smithy/node-http-handler'
import https from 'node:https'

import { env } from './env.js'

export const s3Client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY
  },
  requestHandler: new NodeHttpHandler({
    httpsAgent: new https.Agent({
      keepAlive: true,
      maxFreeSockets: 256,
      timeout: 5000
    })
  })
})

export const s3BucketName = env.AWS_S3_BUCKET_NAME

export const s3UploadUrlExpiresIn = Number(env.AWS_S3_UPLOAD_URL_EXPIRES_IN)