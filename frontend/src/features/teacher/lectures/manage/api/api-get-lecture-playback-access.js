import api from "@/shared/services/axios";

// Calls backend to get signed CloudFront playback access for one ready lecture.
export const getLecturePlaybackAccessApi = async (lectureId) => {
  return await api.get(`/lecture/playback-access/${lectureId}`);
};
