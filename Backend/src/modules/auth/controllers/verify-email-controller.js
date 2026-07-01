import asyncHandler from '../../../utils/async-handler.js'
import ApiResponse from '../../../utils/api-response.js'
import { verifyEmailService } from '../services/verify-email-service.js'

export const verifyEmail = asyncHandler(async (req, res) => {
  const { email, otp } = req.body

  const verifiedUser = await verifyEmailService(email, otp)

  return res
    .status(200)
    .json(new ApiResponse(200, 'Email verified successfully', verifiedUser))
})
