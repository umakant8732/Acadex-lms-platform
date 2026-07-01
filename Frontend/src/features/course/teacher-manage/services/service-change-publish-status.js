import { changePublishStatusApi } from '../api/api-change-publish-status.js'

export const changePublishStatusService = async ({
  courseId,
  isPublished
}) => {
  const response = await changePublishStatusApi({
    courseId,
    isPublished
  })

  return response.data
}
