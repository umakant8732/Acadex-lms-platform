import { useMutation, useQueryClient } from '@tanstack/react-query'

import { courseQueryKeys } from '../helpers/course-query-keys.js'
import { lectureQueryKeys } from '../../../lecture/teacher-manage/helpers/lecture-query-keys.js'
import { deleteCourseService } from '../services/service-delete-course.js'

export const useDeleteCourse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCourseService,
    onSuccess: (_, courseId) => {
      queryClient.invalidateQueries({
        queryKey: courseQueryKeys.manageCoursesRoot
      })
      queryClient.removeQueries({
        queryKey: courseQueryKeys.courseDetails(courseId)
      })
      queryClient.invalidateQueries({
        queryKey: lectureQueryKeys.manageCourses
      })
    }
  })
}
