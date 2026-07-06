import { getCourseDetailsApi } from '../api/api-get-course-details.js'
import type { CourseDetails } from '../../shared/types/public-course-types'

// Extracts course details payload from backend response.
export const getCourseDetailsService = async (
  courseId: string
): Promise<CourseDetails> => {
  const response = await getCourseDetailsApi(courseId)
  return response.data.data
}
