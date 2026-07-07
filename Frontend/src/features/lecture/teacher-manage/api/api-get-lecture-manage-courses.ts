import api from '../../../../shared/services/axios.js'
import type { LectureManageCourse } from '../types/teacher-lecture-types'

export interface GetLectureManageCoursesApiResponse {
  success: boolean
  message: string
  data: {
    courses: LectureManageCourse[]
  }
}

// Calls backend API that returns courses available for lecture management for teacher
export const getLectureManageCoursesApi = async () => {
  return await api.get<GetLectureManageCoursesApiResponse>('/lecture/manage-courses')
}
