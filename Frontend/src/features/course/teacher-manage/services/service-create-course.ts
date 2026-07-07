import { createCourseApi } from '../api/api-course-create.js'
import type { CourseFormValues } from '../types/teacher-course-types'
import type { CreateCourseApiResponse } from '../api/api-course-create'

export const createCourseService = async (courseData: CourseFormValues): Promise<CreateCourseApiResponse> => {
  const response = await createCourseApi(courseData)
  return response.data
}
