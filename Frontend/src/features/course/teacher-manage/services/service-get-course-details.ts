import { getCourseDetailsApi } from '../api/api-get-course-details.js'
import type { CourseDetails } from '../types/teacher-course-types'

export const getCourseDetailsService = async (courseId?: string): Promise<CourseDetails> => {
  const response = await getCourseDetailsApi(courseId)
  return response.data.data
}
