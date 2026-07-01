import { env } from '../../../config/env.js'

const defaultCookieSecure = env.NODE_ENV === 'production'

// Lets us run HTTP on raw EC2 IP now and switch to HTTPS later from env only.
const isCookieSecure = env.COOKIE_SECURE
  ? env.COOKIE_SECURE === 'true'
  : defaultCookieSecure

// Keep same-site simple for same-origin deploys unless we explicitly need cross-site cookies.
const cookieSameSite = env.COOKIE_SAME_SITE || (isCookieSecure ? 'none' : 'lax')

export const cookieOptions = {
  httpOnly: true,
  secure: isCookieSecure,
  sameSite: cookieSameSite,
  path: '/'
}

export const ROLES = Object.freeze({
  STUDENT: 'student',
  TEACHER: 'teacher'
})
