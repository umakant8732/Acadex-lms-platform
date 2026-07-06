import api from '../../../shared/services/axios.js'
import type { AuthUserResponse } from '../types/auth-query-types'

// Fetches current authenticated user details from backend.
export const getCurrentUserApi = async (): Promise<AuthUserResponse> => {
  const response = await api.get<AuthUserResponse>('/auth/me')
  return response.data
}
