import { serializeCourseThumbnail } from '../../helpers/serialize-course-thumbnail.js'
import {
  countCoursesForManage,
  findCoursesForManage
} from '../../repositories/find-manage-courses-repository.js'

export const getManageCoursesService = async ({
  page,
  limit,
  search,
  category
}) => {
  const [courses, totalItems] = await Promise.all([
    findCoursesForManage({ page, limit, search, category }),
    countCoursesForManage({ search, category })
  ])

  const totalPages = Math.ceil(totalItems / limit)
  const serializedCourses = courses.map(serializeCourseThumbnail)

  return {
    courses: serializedCourses,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    },

    filters: { search, category }
  }
}
