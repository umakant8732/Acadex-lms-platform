import { useQuery } from '@tanstack/react-query'

import type {
  StudentCourseOverview,
  StudentCourseQueryError
} from '../../shared/types/student-course-types'
import { studentOverviewQueryKeys } from '../helpers/student-overview-query-keys.js'
import { getStudentCourseOverviewService } from '../services/service-get-student-course-overview.js'

// Uses query because overview data comes from server state.
export const useGetStudentCourseOverview = (courseId: string) => {
  return useQuery<StudentCourseOverview, StudentCourseQueryError>({
    queryKey: studentOverviewQueryKeys.course(courseId),
    queryFn: () => getStudentCourseOverviewService(courseId),
    enabled: Boolean(courseId),
    staleTime: 2 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false
  })
}
