import { getStudentLecturePlaybackAccessApi } from '../api/api-get-student-lecture-playback-access.js'

// Extracts clean playback access payload from backend response.
export const getStudentLecturePlaybackAccessService = async lectureId => {
  const response = await getStudentLecturePlaybackAccessApi(lectureId)
  return response.data.data.playbackAccess
}
