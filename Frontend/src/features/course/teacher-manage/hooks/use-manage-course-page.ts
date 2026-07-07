import { useGetManageCourses } from '../queries/use-get-manage-courses.js'
import { useManageCourseActions } from './use-manage-course-actions.js'
import { useManageCourseFilters } from './use-manage-course-filters.js'
import type { TeacherManageCourseListItem, PaginatedTeacherCourses } from '../types/teacher-course-types'
import type { ManageCourseActionsState } from './use-manage-course-actions'
import type { ManageCourseFiltersState } from './use-manage-course-filters'

export interface ManageCoursePageState extends ManageCourseActionsState {
  courses: TeacherManageCourseListItem[]
  pagination: {
    totalCourses: number
    totalPages: number
    currentPage: number
    limit: number
    page?: number
    totalItems?: number
    hasNextPage?: boolean
    hasPrevPage?: boolean
  }
  appliedFilters: {
    search: string
    category: string
  }
  filterControls: ManageCourseFiltersState

  isLoading: boolean
  isError: boolean
  error: Error | null
  refetchCourses: () => void
}

export const useManageCoursePage = (): ManageCoursePageState => {
  const filters = useManageCourseFilters()
  const manageCoursesQuery = useGetManageCourses(filters.queryParams)
  const actions = useManageCourseActions()
  const manageCoursesData = manageCoursesQuery.data

  return {
    courses: manageCoursesData?.courses ?? [],
    pagination: manageCoursesData?.pagination ?? {
      currentPage: filters.page,
      limit: filters.limit,
      totalCourses: 0,
      totalPages: 0,
      page: filters.page,
      totalItems: 0,
      hasNextPage: false,
      hasPrevPage: false
    },
    appliedFilters: (manageCoursesData as any)?.filters ?? {
      search: filters.search,
      category: filters.category
    },
    filterControls: filters,

    isLoading: manageCoursesQuery.isLoading,
    isError: manageCoursesQuery.isError,
    error: manageCoursesQuery.error as Error | null,
    refetchCourses: () => { void manageCoursesQuery.refetch() },

    ...actions
  }
}
