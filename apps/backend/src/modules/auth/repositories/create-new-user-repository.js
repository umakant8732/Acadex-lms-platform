import User from '../models/user-model.js'

export const createNewUser = async payload => {
  return await User.create(payload)
}
