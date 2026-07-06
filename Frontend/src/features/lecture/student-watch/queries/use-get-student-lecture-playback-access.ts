import { useMutation } from '@tanstack/react-query'

import type { StudentCourseQueryError } from '../../../course/shared/types/student-course-types'
import type { StudentLecturePlaybackAccess } from '../types/student-watch-types'
import { getStudentLecturePlaybackAccessService } from '../services/service-get-student-lecture-playback-access'

// Uses mutation because playback url must be requested fresh on demand.
export const useGetStudentLecturePlaybackAccess = () => {
  return useMutation<StudentLecturePlaybackAccess, StudentCourseQueryError, string>({
    mutationFn: getStudentLecturePlaybackAccessService
  })
}

