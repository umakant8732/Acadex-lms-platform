import { env } from '../../../config/env.js'

const isCookieSecure = env.COOKIE_SECURE
  ? env.COOKIE_SECURE === 'true'
  : env.NODE_ENV === 'production'

const cookieSameSite = env.COOKIE_SAME_SITE || 'lax'

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
