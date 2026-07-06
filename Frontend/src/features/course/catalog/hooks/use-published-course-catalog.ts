import { useGetPublishedCourses } from '../queries/use-get-published-courses.js'
import type { PublishedCourseCatalogState } from '../types/course-catalog-types'

// Shapes catalog state for public home section.
export const usePublishedCourseCatalog = (): PublishedCourseCatalogState => {
  const publishedCoursesQuery = useGetPublishedCourses()

  return {
    courses: publishedCoursesQuery.data ?? [],
    isLoading: publishedCoursesQuery.isLoading,
    isError: publishedCoursesQuery.isError,
    isSuccess: publishedCoursesQuery.isSuccess,
    error: publishedCoursesQuery.error ?? null,
    refetchCourses: publishedCoursesQuery.refetch
  }
}
