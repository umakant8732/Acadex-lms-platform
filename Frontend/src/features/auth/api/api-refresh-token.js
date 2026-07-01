import api from '../../../shared/services/axios.js'

export const refreshTokenApi = async () => {
  const response = await api.post('/auth/refresh-token')
  return response.data
}
