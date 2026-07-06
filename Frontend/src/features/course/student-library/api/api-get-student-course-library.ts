import type { AxiosResponse } from 'axios'

import api from '../../../../shared/services/axios.js'
import type { ApiSuccessResponse } from '../../shared/types/public-course-types'
import type {
  StudentCourseLibraryPayload
} from '../../shared/types/student-course-types'

// Calls backend student library endpoint.
export const getStudentCourseLibraryApi = async (): Promise<
  AxiosResponse<ApiSuccessResponse<StudentCourseLibraryPayload>>
> => {
  return api.get('/course/student/courses')
}
