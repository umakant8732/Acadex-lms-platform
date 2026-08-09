import { createLecturePresignedUploadUrlApi } from "../api/api-create-lecture-presigned-upload-url";

// Extracts clean S3 upload session details from backend response.
export const createLecturePresignedUploadUrlService = async (payload) => {
  const response = await createLecturePresignedUploadUrlApi(payload);
  return response.data.data.presignedUploadSession;
};
