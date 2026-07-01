import { useQuery } from '@tanstack/react-query'

import { courseCatalogQueryKeys } from '../helpers/course-catalog-query-keys.js'
import { getPublishedCoursesService } from '../services/service-get-published-courses.js'

export const useGetPublishedCourses = () => {
  return useQuery({
    queryKey: courseCatalogQueryKeys.publishedCourses,
    queryFn: getPublishedCoursesService,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false
  })
}
