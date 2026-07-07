import api from '../../../../shared/services/axios.js'
import type {
  CreateCourseThumbnailPresignedUploadUrlPayload,
  ThumbnailUploadSessionResult
} from '../types/teacher-course-types'

export interface CreateCourseThumbnailPresignedUploadUrlArgs {
  courseId: string
  payload: CreateCourseThumbnailPresignedUploadUrlPayload
}

export interface CreateCourseThumbnailPresignedUploadUrlApiResponse {
  success: boolean
  message: string
  data: {
    presignedThumbnailUpload: ThumbnailUploadSessionResult
  }
}

// Calls backend to create temporary upload access for one course thumbnail.
export const createCourseThumbnailPresignedUploadUrlApi = async ({
  courseId,
  payload
}: CreateCourseThumbnailPresignedUploadUrlArgs) => {
  return await api.post<CreateCourseThumbnailPresignedUploadUrlApiResponse>(
    `/course/thumbnail/presigned-url/${courseId}`,
    payload
  )
}
