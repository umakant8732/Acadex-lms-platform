import { useMutation } from '@tanstack/react-query'
import { completeLectureUploadService } from '../services/service-complete-lecture-upload.js'
import type {
  CompleteLectureUploadPayload,
  Lecture
} from '../types/teacher-lecture-types'

// Notifies backend that S3 video file upload has completed.
export const useCompleteLectureUpload = () => {
  return useMutation<Lecture, Error, CompleteLectureUploadPayload>({
    mutationFn: completeLectureUploadService
  })
}
