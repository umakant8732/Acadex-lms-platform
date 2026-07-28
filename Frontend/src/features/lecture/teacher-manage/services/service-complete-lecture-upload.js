import { completeLectureUploadApi } from "../api/api-complete-lecture-upload";

// Extracts clean completed lecture details from backend response.
export const completeLectureUploadService = async (payload) => {
  const response = await completeLectureUploadApi(payload);
  return response.data.data.completeUpload;
};
