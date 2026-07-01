import { createLecturePresignedUploadUrlApi } from '../api/api-create-lecture-presigned-upload-url.js'

// Extracts presigned upload session data from the backend API response.

export const createLecturePresignedUploadUrlService = async payload => {
  const response = await createLecturePresignedUploadUrlApi(payload)

  return response.data.data.presignedUploadSession
}
