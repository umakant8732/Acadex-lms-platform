import api from '../../../../shared/services/axios.js'

export interface ChangePublishStatusPayload {
  courseId: string
  isPublished: boolean
}

export interface ChangePublishStatusApiResponse {
  success: boolean
  message: string
}

export const changePublishStatusApi = async ({ courseId, isPublished }: ChangePublishStatusPayload) => {
  return await api.patch<ChangePublishStatusApiResponse>(
    `/course/change-publish-status/${courseId}`,
    { isPublished }
  )
}
