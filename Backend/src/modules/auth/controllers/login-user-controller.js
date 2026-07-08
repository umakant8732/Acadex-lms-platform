import asyncHandler from '../../../utils/async-handler.js'
import ApiResponse from '../../../utils/api-response.js'
import { loginService } from '../services/login-user-service.js'
import { authenticateUserAndSetCookies } from '../helpers/auth-token-helper.js'

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const { user } = await loginService(email, password)

  // Generate tokens, save refresh token to DB, update lastLogin, and set secure cookies
  await authenticateUserAndSetCookies(user, res)

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
