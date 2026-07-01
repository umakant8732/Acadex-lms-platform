import { useMutation } from '@tanstack/react-query'

import { createCourseThumbnailPresignedUploadUrlService } from '../services/service-create-course-thumbnail-presigned-upload-url.js'

// Creates one temporary S3 upload url for selected thumbnail file.
export const useCreateCourseThumbnailPresignedUploadUrl = () => {
  return useMutation({
    mutationFn: createCourseThumbnailPresignedUploadUrlService
  })
}
