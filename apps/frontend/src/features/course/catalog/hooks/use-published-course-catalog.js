import { useGetPublishedCourses } from "../queries/use-get-published-courses";

// Shapes catalog state for public home section.
export const usePublishedCourseCatalog = () => {
  const publishedCoursesQuery = useGetPublishedCourses();

  return {
    courses: publishedCoursesQuery.data ?? [],
    isLoading: publishedCoursesQuery.isLoading,
    isError: publishedCoursesQuery.isError,
    isSuccess: publishedCoursesQuery.isSuccess,
    error: publishedCoursesQuery.error ?? null,
    refetchCourses: publishedCoursesQuery.refetch,
  };
};
