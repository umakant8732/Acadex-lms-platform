import { getStudentLecturePlaybackAccessApi } from "../api/api-get-student-lecture-playback-access";

// Extracts only playback access object for watch page consumption.
export const getStudentLecturePlaybackAccessService = async (lectureId) => {
  const response = await getStudentLecturePlaybackAccessApi(lectureId);
  return response.data.data.playbackAccess;
};
