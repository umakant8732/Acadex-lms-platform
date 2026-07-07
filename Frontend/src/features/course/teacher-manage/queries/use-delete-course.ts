import { useMutation } from '@tanstack/react-query'
import { deleteCourseService } from '../services/service-delete-course.js'
import type { DeleteCourseApiResponse } from '../api/api-course-delete'

export const useDeleteCourse = () => {
  return useMutation<DeleteCourseApiResponse, Error, string>({
    mutationFn: deleteCourseService
  })
}
