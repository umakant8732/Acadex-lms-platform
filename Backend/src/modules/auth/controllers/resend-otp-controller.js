import asyncHandler from '../../../utils/async-handler.js'
import ApiResponse from '../../../utils/api-response.js'
import { resentOTPService } from '../services/resend-otp-service.js'

export const resendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body

  const result = await resentOTPService(email)

  return res.status(200).json(new ApiResponse(200, result.message, result))
})
