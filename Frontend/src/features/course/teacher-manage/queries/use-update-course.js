import { useMutation, useQueryClient } from '@tanstack/react-query'
import { courseQueryKeys } from '../helpers/course-query-keys.js'
import { lectureQueryKeys } from '../../../lecture/teacher-manage/helpers/lecture-query-keys.js'
import { updateCourseService } from '../services/service-update-course.js'

export const useUpdateCourse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCourseService,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: courseQueryKeys.manageCoursesRoot
      })
      queryClient.invalidateQueries({
        queryKey: courseQueryKeys.courseDetails(variables.courseId)
      })

      queryClient.invalidateQueries({
        queryKey: lectureQueryKeys.manageCourses
      })

      queryClient.invalidateQueries({
        queryKey: lectureQueryKeys.courseCurriculum(variables.courseId)
      })
    }
  })
}
