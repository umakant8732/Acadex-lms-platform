import asyncHandler from '../../../utils/async-handler.js'
import ApiResponse from '../../../utils/api-response.js'
import { cookieOptions } from '../constants/auth-constants.js'
import { refreshTokenService } from '../services/refresh-token-service.js'

export const refreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken

  const { accessToken, refreshToken: newRefreshToken } =
    await refreshTokenService(refreshToken)

  res.cookie('accessToken', accessToken, cookieOptions)

  res.cookie('refreshToken', newRefreshToken, cookieOptions)

  return res.status(200).json(new ApiResponse(200, 'Token refreshed'))
})
