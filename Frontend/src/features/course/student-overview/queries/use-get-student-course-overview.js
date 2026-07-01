import { useQuery } from '@tanstack/react-query'

import { studentOverviewQueryKeys } from '../helpers/student-overview-query-keys.js'
import { getStudentCourseOverviewService } from '../services/service-get-student-course-overview.js'

//uses query because overview data comes from server state.

export const useGetStudentCourseOverview = courseId => {
    return useQuery({
        queryKey: studentOverviewQueryKeys.course(courseId),
        queryFn: () => getStudentCourseOverviewService(courseId),
        enabled: Boolean(courseId),
        staleTime: 2 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
        refetchOnWindowFocus: false
    })
}