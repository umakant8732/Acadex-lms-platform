import { getStudentCourseOverviewApi } from '../api/api-get-student-course-overview.js'
import type { StudentCourseOverview } from '../../shared/types/student-course-types'

// Extracts only needed overview payload from backend response.
export const getStudentCourseOverviewService = async (
  courseId: string
): Promise<StudentCourseOverview> => {
  const response = await getStudentCourseOverviewApi(courseId)
  return response.data.data.course
}
