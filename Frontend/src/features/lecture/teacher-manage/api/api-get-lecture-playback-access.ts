import api from '../../../../shared/services/axios.js'
import type { PlaybackAccessResult } from '../types/teacher-lecture-types'

export interface GetLecturePlaybackAccessApiResponse {
  success: boolean
  message: string
  data: {
    playbackAccess: PlaybackAccessResult
  }
}

// Calls backend to get signed CloudFront playback access for one ready lecture.
export const getLecturePlaybackAccessApi = async (lectureId: string) => {
  return await api.get<GetLecturePlaybackAccessApiResponse>(
    `/lecture/playback-access/${lectureId}`
  )
}
