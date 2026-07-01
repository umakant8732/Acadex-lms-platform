import { getCurrentUserApi } from '../api/api-get-current-user.js'

export const getCurrentUserService = async () => {
  return await getCurrentUserApi()
}
