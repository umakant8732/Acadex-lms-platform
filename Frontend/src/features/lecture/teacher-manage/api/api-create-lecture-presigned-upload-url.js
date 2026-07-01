import api from '../../../../shared/services/axios.js'

// Calls backend API to create a temporary S3 presigned upload URL for one lesson video.

export const createLecturePresignedUploadUrlApi = async payload => {
  return await api.post('/lecture/uploads/presigned-url', payload)
}
