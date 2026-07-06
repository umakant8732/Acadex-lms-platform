import { logoutUserApi } from '../api/api-logout-user'
import type { LogoutUserResponse } from '../types/auth-query-types'

// Ends current session through api layer.
export const logoutUserService = (): Promise<LogoutUserResponse> => {
  return logoutUserApi()
}

