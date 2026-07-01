import asyncHandler from '../../../utils/async-handler.js'
import ApiResponse from '../../../utils/api-response.js'
import { forgotPasswordService } from '../services/forgot-password-service.js'

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body

  const result = await forgotPasswordService(email)

  return res.status(200).json(new ApiResponse(200, result.message))
})
