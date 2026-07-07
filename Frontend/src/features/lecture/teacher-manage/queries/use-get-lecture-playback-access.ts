import { useMutation } from '@tanstack/react-query'
import { getLecturePlaybackAccessService } from '../services/service-get-lecture-playback-access.js'
import type { PlaybackAccessResult } from '../types/teacher-lecture-types'

// Gets playback access only when teacher clicks Watch.
// This is a GET API, but we use mutation because it is user-action driven.
// Signed CloudFront URLs are temporary, so they should be created fresh on click.
export const useGetLecturePlaybackAccess = () => {
  return useMutation<PlaybackAccessResult, Error, string>({
    mutationFn: getLecturePlaybackAccessService
  })
}
