import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCourseService } from '../services/service-update-course.js'
import type { UpdateCoursePayload, UpdateCourseApiResponse } from '../api/api-course-update'
import { courseQueryKeys } from '../helpers/course-query-keys.js'

export const useUpdateCourse = () => {
  const queryClient = useQueryClient()

  return useMutation<UpdateCourseApiResponse, Error, UpdateCoursePayload>({
    mutationFn: updateCourseService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseQueryKeys.manageCoursesRoot })
    }
  })
}
