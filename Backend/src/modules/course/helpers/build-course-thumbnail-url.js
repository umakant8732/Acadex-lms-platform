import { env } from '../../../config/env.js'

const normalizeCloudfrontDomain = domain => {
  if (!domain) {
    return ''
  }

  const trimmedDomain = domain.trim().replace(/\/+$/, '')

  if (
    trimmedDomain.startsWith('http://') ||
    trimmedDomain.startsWith('https://')
  ) {
    return trimmedDomain
  }

  return `https://${trimmedDomain}`
}

// Builds public thumbnail url from stored asset key.
export const buildCourseThumbnailUrl = thumbnailKey => {
  if (!thumbnailKey) {
    return ''
  }

  const cloudfrontBaseUrl = normalizeCloudfrontDomain(env.CLOUDFRONT_DOMAIN)

  if (!cloudfrontBaseUrl) {
    return ''
  }

  const normalizedThumbnailKey = thumbnailKey.replace(/^\/+/, '')

  return `${cloudfrontBaseUrl}/${normalizedThumbnailKey}`
}
