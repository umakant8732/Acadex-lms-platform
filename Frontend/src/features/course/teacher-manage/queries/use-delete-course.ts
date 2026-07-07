import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCourseService } from '../services/service-delete-course.js'
import type { DeleteCourseApiResponse } from '../api/api-course-delete'
import { courseQueryKeys } from '../helpers/course-query-keys.js'

export const useDeleteCourse = () => {
  const queryClient = useQueryClient()

  return useMutation<DeleteCourseApiResponse, Error, string>({
    mutationFn: deleteCourseService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseQueryKeys.manageCoursesRoot })
    }
  })
}
