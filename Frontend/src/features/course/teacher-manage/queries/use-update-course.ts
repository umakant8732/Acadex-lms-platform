import { useMutation } from '@tanstack/react-query'
import { updateCourseService } from '../services/service-update-course.js'
import type { UpdateCoursePayload, UpdateCourseApiResponse } from '../api/api-course-update'

export const useUpdateCourse = () => {
  return useMutation<UpdateCourseApiResponse, Error, UpdateCoursePayload>({
    mutationFn: updateCourseService
  })
}
