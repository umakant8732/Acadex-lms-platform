import { getTopCoursesApi } from '../api/api-get-top-courses'

export const getTopCoursesService = async (limit = 5) => {
  const response = await getTopCoursesApi(limit)
  return response.data.data.topCourses || []
}
