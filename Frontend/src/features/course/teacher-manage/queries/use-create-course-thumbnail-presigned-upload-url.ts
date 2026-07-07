import { useMutation } from '@tanstack/react-query'
import { createCourseThumbnailPresignedUploadUrlService } from '../services/service-create-course-thumbnail-presigned-upload-url.js'
import type { CreateCourseThumbnailPresignedUploadUrlServiceArgs } from '../services/service-create-course-thumbnail-presigned-upload-url'
import type { ThumbnailUploadSessionResult } from '../types/teacher-course-types'

export const useCreateCourseThumbnailPresignedUploadUrl = () => {
  return useMutation<
    ThumbnailUploadSessionResult,
    Error,
    CreateCourseThumbnailPresignedUploadUrlServiceArgs
  >({
    mutationFn: createCourseThumbnailPresignedUploadUrlService
  })
}
