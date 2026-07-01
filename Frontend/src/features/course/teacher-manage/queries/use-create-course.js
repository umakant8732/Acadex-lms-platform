import { useMutation, useQueryClient } from '@tanstack/react-query'
import { courseQueryKeys } from '../helpers/course-query-keys.js'
import { lectureQueryKeys } from '../../../lecture/teacher-manage/helpers/lecture-query-keys.js'
import { createCourseService } from '../services/service-create-course.js'

export const useCreateCourse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCourseService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: courseQueryKeys.manageCoursesRoot
      })

      queryClient.invalidateQueries({
        queryKey: lectureQueryKeys.manageCourses
      })
    }
  })
}
