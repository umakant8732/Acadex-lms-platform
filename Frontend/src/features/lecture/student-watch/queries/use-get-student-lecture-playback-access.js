import { useMutation } from '@tanstack/react-query'

import { getStudentLecturePlaybackAccessService } from '../services/service-get-student-lecture-playback-access.js'

// Uses mutation because signed playback URLs should be created fresh.
export const useGetStudentLecturePlaybackAccess = () => {
  return useMutation({
    mutationFn: getStudentLecturePlaybackAccessService
  })
}
