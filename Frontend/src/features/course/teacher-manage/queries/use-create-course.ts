import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCourseService } from '../services/service-create-course.js'
import type { CourseFormValues } from '../types/teacher-course-types'
import type { CreateCourseApiResponse } from '../api/api-course-create'
import { courseQueryKeys } from '../helpers/course-query-keys.js'

export const useCreateCourse = () => {
  const queryClient = useQueryClient()

  return useMutation<CreateCourseApiResponse, Error, CourseFormValues>({
    mutationFn: createCourseService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseQueryKeys.manageCoursesRoot })
    }
  })
}
