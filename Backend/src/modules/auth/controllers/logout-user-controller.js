import asyncHandler from '../../../utils/async-handler.js'
import ApiResponse from '../../../utils/api-response.js'
import { cookieOptions } from '../constants/auth-constants.js'
import { logoutService } from '../services/logout-user-service.js'

export const logoutUser = asyncHandler(async (req, res) => {

  const result = await logoutService(req.user._id)

  res.clearCookie('accessToken', cookieOptions)

  res.clearCookie('refreshToken', cookieOptions)

  res.status(200).json(new ApiResponse(200, result.message))
})
