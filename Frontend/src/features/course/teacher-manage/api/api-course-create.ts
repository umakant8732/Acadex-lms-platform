import api from '../../../../shared/services/axios.js'
import type { CourseFormValues, CourseDetails } from '../types/teacher-course-types'

export interface CreateCourseApiResponse {
  success: boolean
  message: string
  data: CourseDetails
}

export const createCourseApi = async (courseData: CourseFormValues) => {
  return await api.post<CreateCourseApiResponse>('/course/create-course', courseData)
}
