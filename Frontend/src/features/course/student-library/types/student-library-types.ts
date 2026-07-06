import type {
  StudentCourseList,
  StudentCourseQueryError
} from '../../shared/types/student-course-types'

// Student library state keeps list screens and retry handling in sync.
export interface StudentCourseLibraryState {
  courses: StudentCourseList
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  error: StudentCourseQueryError | null
  refetchCourses: () => unknown
}
