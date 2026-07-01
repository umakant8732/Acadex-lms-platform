import { getManageCourseApi } from '../api/api-get-manage-course.js'

export const getManageCoursesService = async ({
  page = 1,
  limit = 10,
  search = '',
  category = ''
} = {}) => {
  const response = await getManageCourseApi({
    page,
    limit,
    search,
    category
  })

  return response.data.data
}
