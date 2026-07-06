import type { AxiosResponse } from 'axios'

import api from '../../../../shared/services/axios.js'
import type { ApiSuccessResponse } from '../../shared/types/public-course-types'
import type {
  StudentCourseOverviewPayload
} from '../../shared/types/student-course-types'

// Calls backend student overview endpoint.
export const getStudentCourseOverviewApi = async (
  courseId: string
): Promise<AxiosResponse<ApiSuccessResponse<StudentCourseOverviewPayload>>> => {
  return api.get(`/course/student/courses/${courseId}`)
}
