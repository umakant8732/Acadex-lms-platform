import ApiError from '../../../utils/api-error.js'
import { findUserById } from '../repositories/find-user-by-id-repository.js'

export const getCurrentUserService = async userId => {
  const user = await findUserById(userId)

  if (!user) {
    throw new ApiError(404, 'User not found')
  }

  return user
}
