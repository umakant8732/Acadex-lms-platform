import type { AxiosError } from 'axios'

import type {
  ApiErrorResponse,
  PublicCourse
} from '../../shared/types/public-course-types'

// Shared catalog UI and hook shapes keep public course listing consistent.
export interface CourseCardProps {
  course: PublicCourse
}

export interface PublishedCourseCatalogState {
  courses: PublicCourse[]
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  error: AxiosError<ApiErrorResponse> | null
  refetchCourses: () => unknown
}
