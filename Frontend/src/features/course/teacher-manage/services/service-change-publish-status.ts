import { changePublishStatusApi } from '../api/api-change-publish-status.js'
import type { ChangePublishStatusPayload, ChangePublishStatusApiResponse } from '../api/api-change-publish-status'

export const changePublishStatusService = async ({
  courseId,
  isPublished
}: ChangePublishStatusPayload): Promise<ChangePublishStatusApiResponse> => {
  const response = await changePublishStatusApi({
    courseId,
    isPublished
  })

  return response.data
}
