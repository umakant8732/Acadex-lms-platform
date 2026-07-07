import { useQuery } from '@tanstack/react-query'
import { getLectureManageCoursesService } from '../services/service-get-lecture-manage-courses.js'
import { lectureQueryKeys } from '../helpers/lecture-query-keys.js'
import type { LectureManageCourse } from '../types/teacher-lecture-types'

// Returns all courses available for teacher's lecture management.
export const useGetLectureManageCourses = () => {
  return useQuery<LectureManageCourse[], Error>({
    queryKey: lectureQueryKeys.manageCourses,
    queryFn: getLectureManageCoursesService
  })
}
