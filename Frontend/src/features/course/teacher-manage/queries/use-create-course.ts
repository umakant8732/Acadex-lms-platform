import { useMutation } from '@tanstack/react-query'
import { createCourseService } from '../services/service-create-course.js'
import type { CourseFormValues } from '../types/teacher-course-types'
import type { CreateCourseApiResponse } from '../api/api-course-create'

export const useCreateCourse = () => {
  return useMutation<CreateCourseApiResponse, Error, CourseFormValues>({
    mutationFn: createCourseService
  })
}
