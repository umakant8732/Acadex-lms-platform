import { getLectureManageCoursesApi } from '../api/api-get-lecture-manage-courses.js'
import type { LectureManageCourse } from '../types/teacher-lecture-types'

// Extracts clean list of courses details from backend response.
export const getLectureManageCoursesService = async (): Promise<LectureManageCourse[]> => {
  const response = await getLectureManageCoursesApi()
  return response.data.data.courses
}
