import type { AxiosResponse } from 'axios'

import api from '../../../../shared/services/axios.js'
import type {
  ApiSuccessResponse,
  PublishedCourseList
} from '../../shared/types/public-course-types'

// Calls public published-courses endpoint.
export const getPublishedCoursesApi = async (): Promise<
  AxiosResponse<ApiSuccessResponse<PublishedCourseList>>
> => {
  return api.get('/course/get-published-courses')
}
