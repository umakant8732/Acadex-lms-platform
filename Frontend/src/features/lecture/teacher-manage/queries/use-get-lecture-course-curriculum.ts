import { useQuery } from '@tanstack/react-query'
import { getLectureCourseCurriculumService } from '../services/service-get-lecture-course-curriculum.js'
import { lectureQueryKeys } from '../helpers/lecture-query-keys.js'
import type { TeacherCourseCurriculum } from '../types/teacher-lecture-types'

// Returns the full course syllabus along with lecture statuses for teacher.
export const useGetLectureCourseCurriculum = (courseId?: string) => {
  return useQuery<TeacherCourseCurriculum, Error>({
    queryKey: lectureQueryKeys.courseCurriculum(courseId),
    queryFn: () => getLectureCourseCurriculumService(courseId),
    enabled: !!courseId
  })
}
