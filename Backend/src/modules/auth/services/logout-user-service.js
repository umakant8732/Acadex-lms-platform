import ApiError from '../../../utils/api-error.js'
import { findUserById } from '../repositories/find-user-by-id-repository.js'
import { removeRefreshToken } from '../repositories/remove-refresh-token-repository.js'

export const logoutService = async userId => {
  const user = await findUserById(userId)

  if (!user) {
    throw new ApiError(404, 'User not found')
  }

  await removeRefreshToken(userId)

  return {
    message: 'Logout successful'
  }
}
