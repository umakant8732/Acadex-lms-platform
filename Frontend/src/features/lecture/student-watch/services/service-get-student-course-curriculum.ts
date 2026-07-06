import { getStudentCourseCurriculumApi } from '../api/api-get-student-course-curriculum'
import type { StudentCourseCurriculum } from '../../../course/shared/types/student-course-types'

// Keeps only needed curriculum payload for UI side.
export const getStudentCourseCurriculumService = async (
  courseId: string
): Promise<StudentCourseCurriculum> => {
  const response = await getStudentCourseCurriculumApi(courseId)
  return response.data.data.curriculum
}

