import { getLecturePlaybackAccessApi } from '../api/api-get-lecture-playback-access.js'
import type { PlaybackAccessResult } from '../types/teacher-lecture-types'

// Extracts clean playback access data from backend response.
export const getLecturePlaybackAccessService = async (lectureId: string): Promise<PlaybackAccessResult> => {
  const response = await getLecturePlaybackAccessApi(lectureId)
  return response.data.data.playbackAccess
}
