import { useMutation, useQueryClient } from '@tanstack/react-query'
import { completeCourseThumbnailUploadService } from '../services/service-complete-course-thumbnail-upload.js'
import type { CompleteCourseThumbnailUploadPayload, CompleteCourseThumbnailUploadApiResponse } from '../api/api-complete-course-thumbnail-upload'
import { courseQueryKeys } from '../helpers/course-query-keys.js'

export const useCompleteCourseThumbnailUpload = () => {
  const queryClient = useQueryClient()

  return useMutation<
    CompleteCourseThumbnailUploadApiResponse,
    Error,
    CompleteCourseThumbnailUploadPayload
  >({
    mutationFn: completeCourseThumbnailUploadService,
    onSuccess: (_, variables) => {
      // Invalidate the course list query so the thumbnail updates in the table list in real time
      queryClient.invalidateQueries({ queryKey: courseQueryKeys.manageCoursesRoot })

      // Invalidate the specific course details query if courseId is present
      if (variables.courseId) {
        queryClient.invalidateQueries({ queryKey: courseQueryKeys.courseDetails(variables.courseId) })
      }
    }
  })
}

