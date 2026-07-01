import { logoutUserApi } from '../api/api-logout-user.js'

export const logoutUserService = async () => {
  return await logoutUserApi()
}
