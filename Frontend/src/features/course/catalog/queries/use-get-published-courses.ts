import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { courseCatalogQueryKeys } from '../helpers/course-catalog-query-keys.js'
import { getPublishedCoursesService } from '../services/service-get-published-courses.js'
import type {
  ApiErrorResponse,
  PublishedCourseList
} from '../../shared/types/public-course-types'

// Gets public course catalog with stable cache settings.
export const useGetPublishedCourses = () => {
  return useQuery<PublishedCourseList, AxiosError<ApiErrorResponse>>({
    queryKey: courseCatalogQueryKeys.publishedCourses,
    queryFn: getPublishedCoursesService,
    staleTime: 1 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true
  })
}
