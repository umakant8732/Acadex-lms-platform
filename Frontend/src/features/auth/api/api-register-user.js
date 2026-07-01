import api from '../../../shared/services/axios.js'

export const registerUserApi = async payload => {
  const response = await api.post('/auth/register', payload)
  return response.data
}
