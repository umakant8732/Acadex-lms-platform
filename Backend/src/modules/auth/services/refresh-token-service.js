import jwt from 'jsonwebtoken'

import ApiError from '../../../utils/api-error.js'
import { env } from '../../../config/env.js'
import {
  generateAccessToken,
  generateRefreshToken
} from '../../../utils/generate-token.js'
import { findUserById } from '../repositories/find-user-by-id-repository.js'
import { updateRefreshToken } from '../repositories/update-refresh-token-repository.js'

export const refreshTokenService = async refreshToken => {
  if (!refreshToken) {
    throw new ApiError(401, 'Refresh token missing')
  }

  const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET)

  const user = await findUserById(decoded.userId)

  if (!user) {
    throw new ApiError(401, 'Invalid refresh token')
  }

  if (user.refreshToken !== refreshToken) {
    throw new ApiError(401, 'Refresh token mismatch')
  }

  const accessToken = generateAccessToken(user._id, user.role)

  const newRefreshToken = generateRefreshToken(user._id)

  await updateRefreshToken(user._id, newRefreshToken)

  return {
    accessToken,
    refreshToken: newRefreshToken
  }
}
