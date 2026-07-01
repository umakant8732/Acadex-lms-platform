import { getPublishedCoursesApi } from '../api/api-get-published-courses.js'

export const getPublishedCoursesService = async () => {
  const response = await getPublishedCoursesApi()
  return response.data.data
}
