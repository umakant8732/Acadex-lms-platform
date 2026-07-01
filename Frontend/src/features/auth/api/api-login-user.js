import api from '../../../shared/services/axios.js'

export const loginUserApi = async payload => {
  const response = await api.post('/auth/login', payload)
  return response.data
}
