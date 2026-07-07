import { useQuery } from '@tanstack/react-query'
import { getCourseDetailsService } from '../services/service-get-course-details.js'
import { courseQueryKeys } from '../helpers/course-query-keys.js'
import type { CourseDetails } from '../types/teacher-course-types'

export const useGetCourseDetails = (courseId?: string) => {
  return useQuery<CourseDetails, Error>({
    queryKey: courseQueryKeys.courseDetails(courseId),
    queryFn: () => getCourseDetailsService(courseId),
    enabled: !!courseId
  })
}
