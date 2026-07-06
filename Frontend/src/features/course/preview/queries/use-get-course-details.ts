import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { coursePreviewQueryKeys } from '../helpers/course-preview-query-keys.js'
import { getCourseDetailsService } from '../services/service-get-course-details.js'
import type {
  ApiErrorResponse,
  CourseDetails
} from '../../shared/types/public-course-types'

// Gets one public course details record for preview pages.
export const useGetCourseDetails = (courseId: string | undefined) => {
  return useQuery<CourseDetails, AxiosError<ApiErrorResponse>>({
    queryKey: coursePreviewQueryKeys.courseDetails(courseId),
    queryFn: async () => {
      if (!courseId) {
        throw new Error('Course id is required')
      }

      return getCourseDetailsService(courseId)
    },
    enabled: Boolean(courseId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false
  })
}
