import api from "@/shared/services/axios";

//calls backend to retry transcoding for a failed lecture video

export const retryLectureTranscodeApi = async (payload) => {
  return await api.post("/lecture/upload/retry", payload);
};
