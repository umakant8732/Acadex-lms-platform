import { readFileSync } from 'node:fs'
import path from 'node:path'

import { env } from './env.js'

const normalizePrivateKey = privateKey => {
  return privateKey.replace(/\\n/g, '\n').trim()
}

const loadCloudFrontPrivateKey = () => {
  if (env.CLOUDFRONT_PRIVATE_KEY) {
    return normalizePrivateKey(env.CLOUDFRONT_PRIVATE_KEY)
  }

  const cloudFrontPrivateKeyPath = path.resolve(
    process.cwd(),
    env.CLOUDFRONT_PRIVATE_KEY_PATH
  )

  return readFileSync(cloudFrontPrivateKeyPath, 'utf-8').trim()
}

// Central CloudFront config used for signed playback URLs.
export const cloudFrontConfig = {
  domain: env.CLOUDFRONT_DOMAIN,
  keyPairId: env.CLOUDFRONT_KEY_PAIR_ID,
  privateKey: loadCloudFrontPrivateKey(),
  urlExpiresIn: Number(env.CLOUDFRONT_URL_EXPIRES_IN)
}
