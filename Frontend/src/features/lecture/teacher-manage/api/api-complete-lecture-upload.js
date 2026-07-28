import api from "../../../../shared/services/axios";

// Calls backend after video file is uploaded to S3
export const completeLectureUploadApi = async (payload) => {
  return await api.post("/lecture/uploads/complete", payload);
};
