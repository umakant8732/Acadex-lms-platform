import api from '../../../../shared/services/axios.js'
import type { PaginatedTeacherCourses, ManageCoursesFilters } from '../types/teacher-course-types'

export interface GetManageCourseApiResponse {
  success: boolean
  message: string
  data: PaginatedTeacherCourses
}

export const getManageCourseApi = async ({
  page = 1,
  limit = 10,
  search = '',
  category = ''
}: ManageCoursesFilters) => {
  return await api.get<GetManageCourseApiResponse>('/course/manage-all-courses', {
    params: {
      page,
      limit,
      search,
      category
    }
  })
}
