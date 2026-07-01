import ApiError from '../../../utils/api-error.js'
import { findUserById } from '../repositories/find-user-by-id-repository.js'
import { saveUser } from '../repositories/save-user-repository.js'

export const changePasswordService = async (
  userId,
  currentPassword,
  newPassword
) => {
  const user = await findUserById(userId)

  if (!user) {
    throw new ApiError(404, 'User not found')
  }

  const isPasswordValid = await user.comparePassword(currentPassword)

  if (!isPasswordValid) {
    throw new ApiError(400, 'Current password is incorrect')
  }

  user.password = newPassword

  user.passwordChangedAt = new Date()

  await saveUser(user)

  return {
    message: 'Password changed successfully'
  }
}
