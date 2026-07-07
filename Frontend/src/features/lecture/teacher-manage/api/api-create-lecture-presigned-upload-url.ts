import api from '../../../../shared/services/axios.js'
import type {
  CreateLecturePresignedUploadUrlPayload,
  CreateLecturePresignedUploadUrlResult
} from '../types/teacher-lecture-types'

export interface CreateLecturePresignedUploadUrlApiResponse {
  success: boolean
  message: string
  data: {
    presignedUploadSession: CreateLecturePresignedUploadUrlResult
  }
}

// Calls backend API to create a temporary S3 presigned upload URL for one lesson video.
export const createLecturePresignedUploadUrlApi = async (payload: CreateLecturePresignedUploadUrlPayload) => {
  return await api.post<CreateLecturePresignedUploadUrlApiResponse>(
    '/lecture/uploads/presigned-url',
    payload
  )
}
