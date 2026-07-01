import asyncHandler from '../../../utils/async-handler.js'
import ApiResponse from '../../../utils/api-response.js'
import { changePasswordService } from '../services/change-password-service.js'

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body

  const result = await changePasswordService(
    req.user._id,
    currentPassword,
    newPassword
  )

  return res.status(200).json(new ApiResponse(200, result.message))
})
