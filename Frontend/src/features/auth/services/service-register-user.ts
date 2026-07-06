import { registerUserApi } from '../api/api-register-user'
import type { RegisterPayload, RegisterUserResponse } from '../types/auth-query-types'

// Passes register payload to api layer and returns verification data.
export const registerUserService = (
  payload: RegisterPayload
): Promise<RegisterUserResponse> => {
  return registerUserApi(payload)
}

