import { useGetManageCourses } from "../queries/use-get-manage-courses";
import { useManageCourseActions } from "./use-manage-course-actions";
import { useManageCourseFilters } from "./use-manage-course-filters";

export const useManageCoursePage = () => {
  const filters = useManageCourseFilters();
  const manageCoursesQuery = useGetManageCourses(filters.queryParams);
  const actions = useManageCourseActions();
  const manageCoursesData = manageCoursesQuery.data;

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
      hasPrevPage: false,
    },
    appliedFilters: manageCoursesData?.filters ?? {
      search: filters.search,
      category: filters.category,
    },
    filterControls: filters,

    isLoading: manageCoursesQuery.isLoading,
    isError: manageCoursesQuery.isError,
    error: manageCoursesQuery.error,
    refetchCourses: () => {
      void manageCoursesQuery.refetch();
    },

    ...actions,
  };
};
