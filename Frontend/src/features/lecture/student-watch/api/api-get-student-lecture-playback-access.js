import api from "../../../../shared/services/axios";

// Calls backend api to get fresh signed playback access for one lecture.
export const getStudentLecturePlaybackAccessApi = async (lectureId) => {
  return api.get(`/lecture/student/playback-access/${lectureId}`);
};
