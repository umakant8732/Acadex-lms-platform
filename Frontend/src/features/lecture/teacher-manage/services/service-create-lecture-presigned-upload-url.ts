import { createLecturePresignedUploadUrlApi } from '../api/api-create-lecture-presigned-upload-url.js'
import type {
  CreateLecturePresignedUploadUrlPayload,
  CreateLecturePresignedUploadUrlResult
} from '../types/teacher-lecture-types'

// Extracts clean S3 upload session details from backend response.
export const createLecturePresignedUploadUrlService = async (
  payload: CreateLecturePresignedUploadUrlPayload
): Promise<CreateLecturePresignedUploadUrlResult> => {
  const response = await createLecturePresignedUploadUrlApi(payload)
  return response.data.data.presignedUploadSession
}
