import User from '../models/user-model.js'

export const updateRefreshToken = async (userId, refreshToken) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      refreshToken
    },
    { new: true }
  )
}
