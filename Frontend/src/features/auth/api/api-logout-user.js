import api from '../../../shared/services/axios.js'

export const logoutUserApi = async () => {
  const response = await api.post('/auth/logout')
  return response.data
}
