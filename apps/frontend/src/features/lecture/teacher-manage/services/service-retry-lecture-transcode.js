import { retryLectureTranscodeApi } from "../api/api-retry-lecture-transcode";

//api execution for retrying transcoding

export const retryLectureTranscodeService = async (payload) => {
  const response = await retryLectureTranscodeApi(payload);
  return response.data;
};
