import api from '../../../shared/services/axios.js'
import type { AuthUserResponse, LoginPayload } from '../types/auth-query-types'

// Sends login form data and returns authenticated user response.
export const loginUserApi = async (
  payload: LoginPayload
): Promise<AuthUserResponse> => {
  const response = await api.post<AuthUserResponse>('/auth/login', payload)
  return response.data
}
