import { getStudentCourseLibraryApi } from '../api/api-get-student-course-library.js'

// Extracts only needed course list payload.
export const getStudentCourseLibraryService = async () => {
  const response = await getStudentCourseLibraryApi()
  return response.data.data.courses
}
