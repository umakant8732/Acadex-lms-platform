import { env } from './env.js'

const parseOriginList = originValue => {
  if (!originValue) {
    return []
  }

  return originValue
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean)
}

// Supports one primary client url plus optional extra urls for local/dev/preview apps.
export const allowedClientOrigins = Array.from(
  new Set([
    ...parseOriginList(env.CLIENT_URL),
    ...parseOriginList(env.CLIENT_URLS)
  ])
)

export const isAllowedClientOrigin = origin => {
  return allowedClientOrigins.includes(origin)
}
