import { useGetPublishedCourses } from '../queries/use-get-published-courses.js'

export const usePublishedCourseCatalog = () => {
  const publishedCoursesQuery = useGetPublishedCourses()

  return {
    courses: publishedCoursesQuery.data ?? [],
    isLoading: publishedCoursesQuery.isLoading,
    isError: publishedCoursesQuery.isError,
    isSuccess: publishedCoursesQuery.isSuccess,
    error: publishedCoursesQuery.error,
    refetchCourses: publishedCoursesQuery.refetch
  }
}
