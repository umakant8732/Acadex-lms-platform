import api from '@/shared/services/axios'

export const getRecentStudentsApi = async (limit = 5) => {
  return await api.get('/course/teacher/analytics/recent-students', {
    params: { limit }
  })
}
