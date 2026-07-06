import { getPublishedCoursesApi } from '../api/api-get-published-courses.js'
import type { PublishedCourseList } from '../../shared/types/public-course-types'

// Extracts only course list from backend response.
export const getPublishedCoursesService = async (): Promise<PublishedCourseList> => {
  const response = await getPublishedCoursesApi()
  return response.data.data
}
