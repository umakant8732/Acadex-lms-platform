import api from '../../../../shared/services/axios.js'
import type {
  CompleteLectureUploadPayload,
  Lecture
} from '../types/teacher-lecture-types'

export interface CompleteLectureUploadApiResponse {
  success: boolean
  message: string
  data: {
    completeUpload: Lecture
  }
}

// Calls backend after video file is uploaded to S3
export const completeLectureUploadApi = async (payload: CompleteLectureUploadPayload) => {
  return await api.post<CompleteLectureUploadApiResponse>(
    '/lecture/uploads/complete',
    payload
  )
}
