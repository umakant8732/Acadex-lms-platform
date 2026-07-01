import { env } from '../../../config/env.js'

const isProduction = env.NODE_ENV === 'production'

// Uses strict cookie rules in prod so cross-site frontend auth keeps working.
export const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax',
  path: '/'
}

export const ROLES = Object.freeze({
  STUDENT: 'student',
  TEACHER: 'teacher'
})
