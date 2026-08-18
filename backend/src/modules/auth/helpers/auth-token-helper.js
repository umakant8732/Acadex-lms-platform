import { generateAccessToken, generateRefreshToken } from '../../../shared/utils/generate-token.js'
import { cookieOptions } from '../constants/auth-constants.js'
import { updateRefreshToken } from '../repositories/update-refresh-token-repository.js'

// Generates access token, saves refresh token to database only,
// updates user lastLogin, and sets access token cookie on the response.
export const authenticateUserAndSetCookies = async (user, res) => {
  const accessToken = generateAccessToken(user._id, user.role)
  const refreshToken = generateRefreshToken(user._id)

  await updateRefreshToken(user._id, refreshToken)

  user.lastLogin = new Date()
  await user.save()

  res.cookie('accessToken', accessToken, cookieOptions)

  return { accessToken }
}
