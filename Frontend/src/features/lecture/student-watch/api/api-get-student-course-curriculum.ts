import type { AxiosResponse } from 'axios'

import api from '../../../../shared/services/axios'
import type { ApiSuccessResponse } from '../../../course/shared/types/public-course-types'
import type {
  StudentCourseCurriculumPayload
} from '../../../course/shared/types/student-course-types'

// Calls backend api to load student course curriculum.
export const getStudentCourseCurriculumApi = async (
  courseId: string
): Promise<AxiosResponse<ApiSuccessResponse<StudentCourseCurriculumPayload>>> => {
  return api.get(`/lecture/student/courses/${courseId}/curriculum`)
}

