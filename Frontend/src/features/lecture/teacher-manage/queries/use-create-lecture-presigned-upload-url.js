import { useMutation } from '@tanstack/react-query'

import { createLecturePresignedUploadUrlService } from '../services/service-create-lecture-presigned-upload-url.js'

// Creates a presigned upload URL for a selected lesson video.

export const useCreateLecturePresignedUploadUrl = () => {
  return useMutation({
    mutationFn: createLecturePresignedUploadUrlService
  })
}
