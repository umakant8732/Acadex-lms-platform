import { getCurrentUserApi } from '../api/api-get-current-user'
import type { AuthUserResponse } from '../types/auth-query-types'

// Loads current authenticated user from api layer.
export const getCurrentUserService = (): Promise<AuthUserResponse> => {
  return getCurrentUserApi()
}

