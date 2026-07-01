import asyncHandler from '../../../utils/async-handler.js'
import ApiResponse from '../../../utils/api-response.js'
import { getCurrentUserService } from '../services/get-current-user-service.js'

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await getCurrentUserService(req.user._id)

  return res.status(200).json(
    new ApiResponse(200, 'User fetched successfully', {
      userId: user._id,
      fullName: user.fullName,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      isEmailVerified: user.isEmailVerified
    })
  )
})
