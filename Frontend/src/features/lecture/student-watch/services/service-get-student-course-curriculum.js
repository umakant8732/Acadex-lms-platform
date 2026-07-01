import { getStudentCourseCurriculumApi } from '../api/api-get-student-course-curriculum.js'

// Keeps only needed curriculum payload for ui side.
export const getStudentCourseCurriculumService = async courseId => {
  const response = await getStudentCourseCurriculumApi(courseId)
  return response.data.data.curriculum
}
