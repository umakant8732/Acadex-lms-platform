import {
  generateAccessToken,
  generateRefreshToken
} from '../../../utils/generate-token.js'
import { cookieOptions } from '../constants/auth-constants.js'
import { updateRefreshToken } from '../repositories/update-refresh-token-repository.js'

// Generates access & refresh tokens, saves refresh token to database,
// updates user lastLogin, and sets secure httpOnly cookies on the response.
export const authenticateUserAndSetCookies = async (user, res) => {
  const accessToken = generateAccessToken(user._id, user.role)
  const refreshToken = generateRefreshToken(user._id)

  // Save refresh token to DB
  await updateRefreshToken(user._id, refreshToken)

  // Update last login timestamp
  user.lastLogin = new Date()
  await user.save()

  // Set HTTP-only cookies
  res.cookie('accessToken', accessToken, cookieOptions)
  res.cookie('refreshToken', refreshToken, cookieOptions)

  return { accessToken, refreshToken }
}
