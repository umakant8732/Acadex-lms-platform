import { useQuery } from '@tanstack/react-query'
import { lectureQueryKeys } from '../helpers/lecture-query-keys.js'
import { getLectureCourseCurriculumService } from '../services/service-get-lecture-course-curriculum.js'

export const useGetLectureCourseCurriculum = courseId => {
  return useQuery({
    queryKey: lectureQueryKeys.courseCurriculum(courseId),
    queryFn: () => getLectureCourseCurriculumService(courseId),
    enabled: Boolean(courseId),
    staleTime: 2 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false
  })
}
