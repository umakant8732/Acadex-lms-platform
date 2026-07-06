import { loginUserApi } from '../api/api-login-user'
import type { AuthUserResponse, LoginPayload } from '../types/auth-query-types'

// Passes login payload to api layer and returns auth response.
export const loginUserService = (
  payload: LoginPayload
): Promise<AuthUserResponse> => {
  return loginUserApi(payload)
}

