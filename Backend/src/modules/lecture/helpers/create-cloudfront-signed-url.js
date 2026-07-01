import path from 'node:path'

// Built-in Node signer used to sign CloudFront policy with private key.
import { createSign } from 'node:crypto'

import { cloudFrontConfig } from '../../../config/cloudfront.js'

// Converts normal base64 into CloudFront-safe base64.
// CloudFront signed URL params need -, _, ~ instead of +, =, /.
const toCloudFrontSafeBase64 = value => {
  const buffer = Buffer.isBuffer(value) ? value : Buffer.from(value)

  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/=/g, '_')
    .replace(/\//g, '~')
}

// Builds CloudFront URL from private S3 object key.
// Frontend will use this URL instead of direct S3 URL.
const buildCloudFrontUrl = s3Key => {
  return `https://${cloudFrontConfig.domain}/${encodeURI(s3Key)}`
}

// Creates wildcard policy for one HLS folder.
// This allows master.m3u8 and all segment files under same folder.
const createHlsFolderPolicy = ({ resourcePattern, expiresAt }) => {
  return JSON.stringify({
    Statement: [
      {
        Resource: resourcePattern,
        Condition: {
          DateLessThan: {
            'AWS:EpochTime': expiresAt
          }
        }
      }
    ]
  })
}

// Signs policy with backend private key.
// CloudFront verifies this signature using uploaded public key.
const signPolicy = policy => {
  const signer = createSign('RSA-SHA1')
  signer.update(policy)

  return toCloudFrontSafeBase64(
    signer.sign(cloudFrontConfig.privateKey)
  )
}

// Creates signed CloudFront playback details for one ready HLS video.
// signedQuery is returned separately so frontend can attach it to segment requests.
export const createCloudFrontSignedHlsPlayback = hlsMasterKey => {
  const hlsFolderKey = path.posix.dirname(hlsMasterKey)

  const playlistUrl = buildCloudFrontUrl(hlsMasterKey)
  const resourcePattern = `${buildCloudFrontUrl(hlsFolderKey)}/*`

  const expiresAt = Math.floor(Date.now() / 1000) + cloudFrontConfig.urlExpiresIn

  const policy = createHlsFolderPolicy({
    resourcePattern,
    expiresAt
  })

  const signedQuery = new URLSearchParams({
    Policy: toCloudFrontSafeBase64(policy),
    Signature: signPolicy(policy),
    'Key-Pair-Id': cloudFrontConfig.keyPairId
  }).toString()

  return {
    playlistUrl: `${playlistUrl}?${signedQuery}`,
    signedQuery,
    expiresAt,
    resourcePattern
  }
}
