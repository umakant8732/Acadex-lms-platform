import { getStudentLecturePlaybackAccessApi } from '../api/api-get-student-lecture-playback-access'
import type { StudentLecturePlaybackAccess } from '../types/student-watch-types'

// Extracts only playback access object for watch page consumption.
export const getStudentLecturePlaybackAccessService = async (
  lectureId: string
): Promise<StudentLecturePlaybackAccess> => {
  const response = await getStudentLecturePlaybackAccessApi(lectureId)
  return response.data.data.playbackAccess
}

