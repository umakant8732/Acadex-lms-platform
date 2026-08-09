import api from "@/shared/services/axios";

export const changePublishStatusApi = async ({ courseId, isPublished }) => {
  return await api.patch(`/course/change-publish-status/${courseId}`, {
    isPublished,
  });
};
