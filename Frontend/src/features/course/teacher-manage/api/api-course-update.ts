import api from '../../../../shared/services/axios.js'
import type { CourseFormValues, CourseDetails } from '../types/teacher-course-types'

export interface UpdateCoursePayload {
  courseId: string
  courseData: CourseFormValues
}

export interface UpdateCourseApiResponse {
  success: boolean
  message: string
  data: CourseDetails
}

export const updateCourseApi = async ({ courseId, courseData }: UpdateCoursePayload) => {
  return await api.patch<UpdateCourseApiResponse>(
    `/course/update-course/${courseId}`,
    courseData
  )
}
