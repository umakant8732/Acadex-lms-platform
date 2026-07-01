import { loginUserApi } from '../api/api-login-user.js'

export const loginUserService = async payload => {
  return await loginUserApi(payload)
}
