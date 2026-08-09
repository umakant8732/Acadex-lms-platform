import User from '../models/user-model.js'

export const verifyUserEmail = async userId => {
  return await User.findByIdAndUpdate(
    userId,
    {
      isEmailVerified: true
    },
    {
      new: true
    }
  )
}
