import api from '../../../../shared/services/axios.js'

// Calls backend to create temporary upload access for one course thumbnail.
export const createCourseThumbnailPresignedUploadUrlApi = async ({
  courseId,
  payload
}) => {
  return await api.post(`/course/thumbnail/presigned-url/${courseId}`, payload)
}
