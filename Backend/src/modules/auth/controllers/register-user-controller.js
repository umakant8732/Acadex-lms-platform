import asyncHandler from '../../../utils/async-handler.js'
import ApiResponse from '../../../utils/api-response.js'
import { registerService } from '../services/register-user-service.js'

export const registerUser = asyncHandler(async (req, res) => {
  const result = await registerService(req.body)

  if (!result.isNewUser) {
    return res.status(200).json(
      new ApiResponse(200, 'Verification OTP sent again', {
        email: result.email
      })
    )
  }

  const user = result.user

  return res.status(201).json(
    new ApiResponse(201, 'User registered successfully', {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      avatar: user.avatar
    })
  )
})
