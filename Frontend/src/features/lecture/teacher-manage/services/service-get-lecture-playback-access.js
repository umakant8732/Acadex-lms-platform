import { getLecturePlaybackAccessApi } from '../api/api-get-lecture-playback-access.js'

// Extracts clean playback access data from backend response.
export const getLecturePlaybackAccessService = async lectureId => {
  const response = await getLecturePlaybackAccessApi(lectureId)

  return response.data.data.playbackAccess
}
