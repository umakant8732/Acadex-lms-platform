import { useQuery } from '@tanstack/react-query'
import { getTopCoursesService } from '../services/service-get-top-courses'

export const useGetTopCourses = (limit = 5) => {
  return useQuery({
    queryKey: ['teacher-top-courses', limit],
    queryFn: () => getTopCoursesService(limit)
  })
}
