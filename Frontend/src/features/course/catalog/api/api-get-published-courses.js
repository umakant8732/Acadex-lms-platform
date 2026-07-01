import api from '../../../../shared/services/axios.js'

export const getPublishedCoursesApi = async () => {
  return await api.get('/course/get-published-courses')
}
