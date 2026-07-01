import Course from '../models/course-model.js'

const escapeRegex = value => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const buildManageCoursesFilter = ({ search = '', category = '' }) => {
  const filter = { delete: { $ne: true } }

  if (category) {
    const escapedCategory = escapeRegex(category)

    filter.category = {
      $regex: `^${escapedCategory}$`,
      $options: 'i'
    }
  }

  if (search) {
    const escapedSearch = escapeRegex(search)

    filter.$or = [
      { title: { $regex: escapedSearch, $options: 'i' } },
      { subtitle: { $regex: escapedSearch, $options: 'i' } },
      { category: { $regex: escapedSearch, $options: 'i' } }
    ]
  }

  return filter
}

export const findCoursesForManage = async ({
  page,
  limit,
  search,
  category
}) => {
  const filter = buildManageCoursesFilter({ search, category })
  const skip = (page - 1) * limit
  return await Course.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
}

export const countCoursesForManage = async ({ search, category }) => {
  const filter = buildManageCoursesFilter({
    search,
    category
  })

  return await Course.countDocuments(filter)
}
