import { completeLectureUploadApi } from '../api/api-complete-lecture-upload.js'
import type {
  CompleteLectureUploadPayload,
  Lecture
} from '../types/teacher-lecture-types'

// Extracts clean completed lecture details from backend response.
export const completeLectureUploadService = async (payload: CompleteLectureUploadPayload): Promise<Lecture> => {
  const response = await completeLectureUploadApi(payload)
  return response.data.data.completeUpload
}
