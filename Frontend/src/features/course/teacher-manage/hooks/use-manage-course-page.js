import { useGetManageCourses } from '../queries/use-get-manage-courses.js'
import { useManageCourseActions } from './use-manage-course-actions.js'
import { useManageCourseFilters } from './use-manage-course-filters.js'

export const useManageCoursePage = () => {
  const filters = useManageCourseFilters()
  const manageCoursesQuery = useGetManageCourses(filters.queryParams)
  const actions = useManageCourseActions()
  const manageCoursesData = manageCoursesQuery.data

  return {
    courses: manageCoursesData?.courses ?? [],
    pagination: manageCoursesData?.pagination ?? {
      page: filters.page,
      limit: filters.limit,
      totalItems: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false
    },
    appliedFilters: manageCoursesData?.filters ?? {
      search: filters.search,
      category: filters.category
    },
    filterControls: filters,

    isLoading: manageCoursesQuery.isLoading,
    isError: manageCoursesQuery.isError,
    error: manageCoursesQuery.error,
    refetchCourses: manageCoursesQuery.refetch,

    ...actions
  }
}
