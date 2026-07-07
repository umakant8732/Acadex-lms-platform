import { getManageCourseApi } from '../api/api-get-manage-course.js'
import type { PaginatedTeacherCourses, ManageCoursesFilters } from '../types/teacher-course-types'

export const getManageCoursesService = async ({
  page = 1,
  limit = 10,
  search = '',
  category = ''
}: ManageCoursesFilters = {}): Promise<PaginatedTeacherCourses> => {
  const response = await getManageCourseApi({
    page,
    limit,
    search,
    category
  })

  return response.data.data
}
