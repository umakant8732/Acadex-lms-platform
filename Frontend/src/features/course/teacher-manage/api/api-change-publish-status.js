import api from '../../../../shared/services/axios.js'

export const changePublishStatusApi = ({ courseId, isPublished }) => {
  return api.patch(`/course/change-publish-status/${courseId}`, {
    isPublished
  })
}
