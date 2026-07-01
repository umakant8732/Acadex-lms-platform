import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'

import { GetObjectCommand } from '@aws-sdk/client-s3'

import { s3BucketName, s3Client } from '../../../config/aws-s3.js'

// Downloads s3 object stream into local file.
export const downloadS3ObjectToFile = async ({ key, filePath }) => {
  const response = await s3Client.send(
    new GetObjectCommand({
      Bucket: s3BucketName,
      Key: key
    })
  )

  await pipeline(response.Body, createWriteStream(filePath))

  return filePath
}
