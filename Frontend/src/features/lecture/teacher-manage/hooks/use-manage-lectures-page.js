import { useNavigate } from 'react-router-dom'
import { useGetLectureManageCourses } from '../queries/use-get-lecture-manage-courses.js'

// Keeps the manage lectures page focused on rendering page state.
export const useManageLecturesPage = () => {
  const lectureManageCoursesQuery = useGetLectureManageCourses()

  const navigate = useNavigate()

  const goToCourseCurriculumPage = courseId => {
    navigate(`/teacher/lectures/${courseId}`)
  }

  return {
    courses: lectureManageCoursesQuery.data ?? [],
    isLoading: lectureManageCoursesQuery.isLoading,
    isError: lectureManageCoursesQuery.isError,
    error: lectureManageCoursesQuery.error,
    refetchCourses: lectureManageCoursesQuery.refetch,
    goToCourseCurriculumPage
  }
}
