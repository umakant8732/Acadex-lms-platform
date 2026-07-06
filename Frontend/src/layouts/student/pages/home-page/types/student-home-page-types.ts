import type { ChangeEventHandler } from 'react'

import type {
  StudentCourse,
  StudentCourseQueryError
} from '../../../../../features/course/shared/types/student-course-types'

// Student home page types keep library UI props predictable.
export interface StudentHomeHeroProps {
  totalCourses: number
  categoryCount: number
}

export interface CourseSearchProps {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export interface StudentCourseCardProps {
  course: StudentCourse
}

export interface CoursesGridProps {
  courses: StudentCourse[]
  isLoading: boolean
  isError: boolean
  error: StudentCourseQueryError | null
  hasActiveSearch: boolean
  onRetry: () => unknown
}

export interface StudentHomePageState {
  searchValue: string
  courses: StudentCourse[]
  totalCourses: number
  categoryCount: number
  isLoading: boolean
  isError: boolean
  error: StudentCourseQueryError | null
  hasActiveSearch: boolean
  handleSearchValueChange: ChangeEventHandler<HTMLInputElement>
  refetchCourses: () => unknown
}
