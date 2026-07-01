import { useMutation } from '@tanstack/react-query'

import { completeLectureUploadService } from '../services/service-complete-lecture-upload.js'

// Calls backend after S3 upload is completed.

export const useCompleteLectureUpload = () => {
  return useMutation({
    mutationFn: completeLectureUploadService
  })
}
