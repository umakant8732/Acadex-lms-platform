import api from '../../../../shared/services/axios.js'
import type { CourseDetails } from '../types/teacher-course-types'

export interface GetCourseDetailsApiResponse {
  success: boolean
  message: string
  data: CourseDetails
}

export const getCourseDetailsApi = async (courseId?: string) => {
  return await api.get<GetCourseDetailsApiResponse>(`/course/get-course-details/${courseId}`)
}
