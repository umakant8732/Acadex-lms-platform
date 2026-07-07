import { deleteCourseApi } from '../api/api-course-delete.js'
import type { DeleteCourseApiResponse } from '../api/api-course-delete'

export const deleteCourseService = async (courseId: string): Promise<DeleteCourseApiResponse> => {
  const response = await deleteCourseApi(courseId)
  return response.data
}
