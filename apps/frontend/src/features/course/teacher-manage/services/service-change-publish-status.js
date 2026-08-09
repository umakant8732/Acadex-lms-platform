import { changePublishStatusApi } from "../api/api-change-publish-status";

export const changePublishStatusService = async ({ courseId, isPublished }) => {
  const response = await changePublishStatusApi({
    courseId,
    isPublished,
  });

  return response.data;
};
