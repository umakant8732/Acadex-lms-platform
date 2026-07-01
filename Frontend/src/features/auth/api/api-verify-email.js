import api from '../../../shared/services/axios.js'

export const verifyEmailApi = async data => {
  const response = await api.post('/auth/verify-email', data)
  return response.data
}
