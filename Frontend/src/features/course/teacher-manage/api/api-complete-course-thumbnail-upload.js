import api from '../../../../shared/services/axios.js'

// Calls backend after direct S3 image upload is done.
export const completeCourseThumbnailUploadApi = async ({
  courseId,
  thumbnailKey
}) => {
  return await api.patch(`/course/thumbnail/complete/${courseId}`, {
    thumbnailKey
  })
}
