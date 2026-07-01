import { useGetStudentCourseLibrary } from '../queries/use-get-student-course-library.js'

// Wraps query so layouts/pages get a small clean contract.
export const useStudentCourseLibrary = () => {
  const studentCourseLibraryQuery = useGetStudentCourseLibrary()

  return {
    courses: studentCourseLibraryQuery.data ?? [],
    isLoading: studentCourseLibraryQuery.isLoading,
    isError: studentCourseLibraryQuery.isError,
    isSuccess: studentCourseLibraryQuery.isSuccess,
    error: studentCourseLibraryQuery.error,
    refetchCourses: studentCourseLibraryQuery.refetch
  }
}
