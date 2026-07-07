import { useParams } from 'react-router-dom'
import { useGetCourseDetails } from '../queries/use-get-course-details.js'
import type { CourseDetails } from '../types/teacher-course-types'

export interface CourseDetailsPageState {
  courseId: string | undefined
  course: CourseDetails | null
  isLoading: boolean
  isError: boolean
  error: Error | null
  refetchCourse: () => void
}

export const useCourseDetailsPage = (): CourseDetailsPageState => {
  const { courseId } = useParams<{ courseId: string }>()
  const courseDetailsQuery = useGetCourseDetails(courseId)

  return {
    courseId,
    course: courseDetailsQuery.data ?? null,
    isLoading: courseDetailsQuery.isLoading,
    isError: courseDetailsQuery.isError,
    error: courseDetailsQuery.error as Error | null,
    refetchCourse: () => { void courseDetailsQuery.refetch() }
  }
}
