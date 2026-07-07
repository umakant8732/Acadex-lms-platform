import api from '../../../../shared/services/axios.js'

export interface CompleteCourseThumbnailUploadPayload {
  courseId: string
  thumbnailKey: string
}

export interface CompleteCourseThumbnailUploadApiResponse {
  success: boolean
  message: string
}

// Calls backend after direct S3 image upload is done.
export const completeCourseThumbnailUploadApi = async ({
  courseId,
  thumbnailKey
}: CompleteCourseThumbnailUploadPayload) => {
  return await api.patch<CompleteCourseThumbnailUploadApiResponse>(
    `/course/thumbnail/complete/${courseId}`,
    { thumbnailKey }
  )
}
