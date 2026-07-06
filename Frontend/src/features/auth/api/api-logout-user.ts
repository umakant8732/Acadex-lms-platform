import api from '../../../shared/services/axios.js'
import type { LogoutUserResponse } from '../types/auth-query-types'

// Calls logout endpoint and clears current session on backend.
export const logoutUserApi = async (): Promise<LogoutUserResponse> => {
  const response = await api.post<LogoutUserResponse>('/auth/logout')
  return response.data
}
