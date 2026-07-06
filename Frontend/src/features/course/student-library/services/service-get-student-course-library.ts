import { getStudentCourseLibraryApi } from '../api/api-get-student-course-library.js'
import type { StudentCourseList } from '../../shared/types/student-course-types'

// Extracts only needed course list payload.
export const getStudentCourseLibraryService = async (): Promise<StudentCourseList> => {
  const response = await getStudentCourseLibraryApi()
  return response.data.data.courses
}
