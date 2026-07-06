import api from '../../../shared/services/axios.js'
import type {
  RegisterPayload,
  RegisterUserResponse
} from '../types/auth-query-types'

// Sends register form data and returns email verification response.
export const registerUserApi = async (
  payload: RegisterPayload
): Promise<RegisterUserResponse> => {
  const response = await api.post<RegisterUserResponse>(
    '/auth/register',
    payload
  )
  return response.data
}
