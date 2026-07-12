import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCourseService } from '../services/service-update-course.js'
import type { UpdateCoursePayload, UpdateCourseApiResponse } from '../api/api-course-update'
import { courseQueryKeys } from '../helpers/course-query-keys.js'

export const useUpdateCourse = () => {
  const queryClient = useQueryClient()

  return useMutation<UpdateCourseApiResponse, Error, UpdateCoursePayload>({
    mutationFn: updateCourseService,
    onSuccess: (_, variables) => {
      // Invalidate the course lists query
      queryClient.invalidateQueries({ queryKey: courseQueryKeys.manageCoursesRoot })

      // Invalidate the specific course details cache so that edits reflect in real time on return
      if (variables.courseId) {
        queryClient.invalidateQueries({ queryKey: courseQueryKeys.courseDetails(variables.courseId) })
      }
    }
  })
}

