import api from '../../../../shared/services/axios.js'

// Calls backend to get signed playback access for one student lecture.
export const getStudentLecturePlaybackAccessApi = async lectureId => {
  return await api.get(`/lecture/student/playback-access/${lectureId}`)
}
