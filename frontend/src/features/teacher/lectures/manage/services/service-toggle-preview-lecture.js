import { togglePreviewLectureApi } from "../api/api-toggle-preview-lecture";

//service execution for toggling preview status

export const togglePreviewLectureService = async (payload) => {
  const response = await togglePreviewLectureApi(payload);
  return response.data;
};
