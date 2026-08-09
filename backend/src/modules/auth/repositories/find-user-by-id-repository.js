import User from '../models/user-model.js'

export const findUserById = async userId => {
  return await User.findById(userId)
}
