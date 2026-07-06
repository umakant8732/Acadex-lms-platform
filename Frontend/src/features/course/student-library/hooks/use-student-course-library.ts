import { useGetStudentCourseLibrary } from '../queries/use-get-student-course-library.js'
import type { StudentCourseLibraryState } from '../types/student-library-types'

// Normalizes student library query output for page consumption.
export const useStudentCourseLibrary = (): StudentCourseLibraryState => {
  const studentCourseLibraryQuery = useGetStudentCourseLibrary()

  return {
    courses: studentCourseLibraryQuery.data ?? [],
    isLoading: studentCourseLibraryQuery.isLoading,
    isError: studentCourseLibraryQuery.isError,
    isSuccess: studentCourseLibraryQuery.isSuccess,
    error: studentCourseLibraryQuery.error ?? null,
    refetchCourses: studentCourseLibraryQuery.refetch
  }
}
