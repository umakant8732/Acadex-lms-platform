import asyncHandler from '../../../utils/async-handler.js'
import ApiResponse from '../../../utils/api-response.js'
import { resetPasswordService } from '../services/reset-password-service.js'

export const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body

  const result = await resetPasswordService(email, otp, newPassword)

  return res.status(200).json(new ApiResponse(200, result.message))
})
