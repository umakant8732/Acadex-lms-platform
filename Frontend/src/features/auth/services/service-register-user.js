import { registerUserApi } from '../api/api-register-user.js'

export const registerUserService = async data => {
  return await registerUserApi(data)
}
