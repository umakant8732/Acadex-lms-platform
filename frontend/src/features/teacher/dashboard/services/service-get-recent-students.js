import { getRecentStudentsApi } from '../api/api-get-recent-students'

export const getRecentStudentsService = async (limit = 5) => {
  const response = await getRecentStudentsApi(limit)
  return response.data.data.recentStudents || []
}
