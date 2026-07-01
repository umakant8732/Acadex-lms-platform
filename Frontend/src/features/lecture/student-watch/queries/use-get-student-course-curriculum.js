import { useQuery } from '@tanstack/react-query'

import { studentWatchQueryKeys } from '../helpers/student-watch-query-keys.js'
import { getStudentCourseCurriculumService } from '../services/service-get-student-course-curriculum.js'

// Uses query because curriculum comes from server state.
// React query gives cache, loading and retry support.
export const useGetStudentCourseCurriculum = courseId => {
  return useQuery({
    queryKey: studentWatchQueryKeys.courseCurriculum(courseId),
    queryFn: () => getStudentCourseCurriculumService(courseId),
    enabled: Boolean(courseId),
    staleTime: 2 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false
  })
}
