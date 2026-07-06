import type { AxiosResponse } from 'axios'

import api from '../../../../shared/services/axios.js'
import type {
  ApiSuccessResponse,
  CourseDetails
} from '../../shared/types/public-course-types'

// Calls public course-details endpoint by course id.
export const getCourseDetailsApi = async (
  courseId: string
): Promise<AxiosResponse<ApiSuccessResponse<CourseDetails>>> => {
  return api.get(`/course/get-course-details/${courseId}`)
}
