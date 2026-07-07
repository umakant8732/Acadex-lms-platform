import { useMutation } from '@tanstack/react-query'
import { createLecturePresignedUploadUrlService } from '../services/service-create-lecture-presigned-upload-url.js'
import type {
  CreateLecturePresignedUploadUrlPayload,
  CreateLecturePresignedUploadUrlResult
} from '../types/teacher-lecture-types'

// Fetches an S3 pre-signed upload URL for streaming uploads.
export const useCreateLecturePresignedUploadUrl = () => {
  return useMutation<
    CreateLecturePresignedUploadUrlResult,
    Error,
    CreateLecturePresignedUploadUrlPayload
  >({
    mutationFn: createLecturePresignedUploadUrlService
  })
}
