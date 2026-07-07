import { useMutation } from '@tanstack/react-query'
import { completeCourseThumbnailUploadService } from '../services/service-complete-course-thumbnail-upload.js'
import type { CompleteCourseThumbnailUploadPayload, CompleteCourseThumbnailUploadApiResponse } from '../api/api-complete-course-thumbnail-upload'

export const useCompleteCourseThumbnailUpload = () => {
  return useMutation<
    CompleteCourseThumbnailUploadApiResponse,
    Error,
    CompleteCourseThumbnailUploadPayload
  >({
    mutationFn: completeCourseThumbnailUploadService
  })
}
