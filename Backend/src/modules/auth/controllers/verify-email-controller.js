import asyncHandler from '../../../utils/async-handler.js'
import ApiResponse from '../../../utils/api-response.js'
import { verifyEmailService } from '../services/verify-email-service.js'
import { authenticateUserAndSetCookies } from '../helpers/auth-token-helper.js'

export const verifyEmail = asyncHandler(async (req, res) => {
  const { email, otp } = req.body

  const verifiedUser = await verifyEmailService(email, otp)

  // Auto-login the user immediately on successful email verification
  await authenticateUserAndSetCookies(verifiedUser, res)

  return res
    .status(200)
    .json(new ApiResponse(200, 'Email verified successfully', {
      id: verifiedUser._id,
      fullName: verifiedUser.fullName,
      email: verifiedUser.email,
      avatar: verifiedUser.avatar,
      role: verifiedUser.role,
      isEmailVerified: verifiedUser.isEmailVerified
    }))
})
