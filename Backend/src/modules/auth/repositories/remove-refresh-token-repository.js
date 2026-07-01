import User from '../models/user-model.js'

export const removeRefreshToken = async userId => {
  return await User.findByIdAndUpdate(
    userId,
    {
      refreshToken: null
    },
    {
      new: true
    }
  )
}
