import { useQuery } from '@tanstack/react-query'

import type {
  StudentCourseCurriculum,
  StudentCourseQueryError
} from '../../../course/shared/types/student-course-types'
import { studentWatchQueryKeys } from '../helpers/student-watch-query-keys'
import { getStudentCourseCurriculumService } from '../services/service-get-student-course-curriculum'

// Uses query because curriculum comes from server state.
// React query gives cache, loading and retry support.
export const useGetStudentCourseCurriculum = (courseId: string) => {
  return useQuery<StudentCourseCurriculum, StudentCourseQueryError>({
    queryKey: studentWatchQueryKeys.courseCurriculum(courseId),
    queryFn: () => getStudentCourseCurriculumService(courseId),
    enabled: Boolean(courseId),
    staleTime: 2 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false
  })
}


