import { useQuery } from '@tanstack/react-query'
import { getManageCoursesService } from '../services/service-get-manage-courses.js'
import { courseQueryKeys } from '../helpers/course-query-keys.js'
import type { PaginatedTeacherCourses, ManageCoursesFilters } from '../types/teacher-course-types'

export const useGetManageCourses = (params: ManageCoursesFilters = {}) => {
  return useQuery<PaginatedTeacherCourses, Error>({
    queryKey: courseQueryKeys.manageCourses(params),
    queryFn: () => getManageCoursesService(params)
  })
}
