import { useNavigate } from 'react-router-dom'
import { useGetLectureManageCourses } from '../queries/use-get-lecture-manage-courses.js'
import type { LectureManageCourse } from '../types/teacher-lecture-types'

export interface ManageLecturesPageState {
  courses: LectureManageCourse[]
  isLoading: boolean
  isError: boolean
  error: Error | null
  refetchCourses: () => void
  goToCourseCurriculumPage: (courseId: string) => void
}

// Keeps the manage lectures page focused on rendering page state.
export const useManageLecturesPage = (): ManageLecturesPageState => {
  const lectureManageCoursesQuery = useGetLectureManageCourses()

  const navigate = useNavigate()

  const goToCourseCurriculumPage = (courseId: string) => {
    navigate(`/teacher/lectures/${courseId}`)
  }

  return {
    courses: lectureManageCoursesQuery.data ?? [],
    isLoading: lectureManageCoursesQuery.isLoading,
    isError: lectureManageCoursesQuery.isError,
    error: lectureManageCoursesQuery.error as Error | null,
    refetchCourses: lectureManageCoursesQuery.refetch,
    goToCourseCurriculumPage
  }
}
