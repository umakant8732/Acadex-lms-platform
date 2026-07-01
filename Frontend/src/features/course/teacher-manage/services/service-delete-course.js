import { deleteCourseApi } from '../api/api-course-delete.js'

export const deleteCourseService = async courseId => {
  const response = await deleteCourseApi(courseId)
  return response.data
}
