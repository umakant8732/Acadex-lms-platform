import type { AxiosResponse } from 'axios'

import api from '../../../../shared/services/axios'
import type { ApiSuccessResponse } from '../../../course/shared/types/public-course-types'
import type { StudentLecturePlaybackAccessPayload } from '../types/student-watch-types'

// Calls backend api to get fresh signed playback access for one lecture.
export const getStudentLecturePlaybackAccessApi = async (
  lectureId: string
): Promise<AxiosResponse<ApiSuccessResponse<StudentLecturePlaybackAccessPayload>>> => {
  return api.get(`/lecture/student/playback-access/${lectureId}`)
}

