import { useQuery } from '@tanstack/react-query'

import { coursePreviewQueryKeys } from '../helpers/course-preview-query-keys.js'
import { getCourseDetailsService } from '../services/service-get-course-details.js'

export const useGetCourseDetails = courseId => {
  return useQuery({
    queryKey: coursePreviewQueryKeys.courseDetails(courseId),
    queryFn: () => getCourseDetailsService(courseId),
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false
  })
}
