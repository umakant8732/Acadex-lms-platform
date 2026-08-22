import api from '@/shared/services/axios'

export const getTopCoursesApi = async (limit = 5) => {
  return await api.get('/course/teacher/analytics/top-courses', {
    params: { limit }
  })
}
