import asyncHandler from '../../../utils/async-handler.js'
import ApiResponse from '../../../utils/api-response.js'
import { cookieOptions } from '../constants/auth-constants.js'
import { loginService } from '../services/login-user-service.js'

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const { user, accessToken, refreshToken } = await loginService(
    email,
    password
  )

  res.cookie('accessToken', accessToken, cookieOptions)

  res.cookie('refreshToken', refreshToken, cookieOptions)

  return res.status(200).json(
    new ApiResponse(200, 'Login successful', {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      isEmailVerified: user.isEmailVerified
    })
  )
})
