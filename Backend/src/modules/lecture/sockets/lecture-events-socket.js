import { getSocketServer } from '../../../config/socket-store.js'
import { logger } from '../../../utils/logger.js'

// Keeps lecture socket event names in one place.
// This prevents typo bugs when backend emits and frontend listens.
export const LECTURE_SOCKET_EVENTS = Object.freeze({
  STATUS_CHANGED: 'lecture:status-changed'
})

// Creates room name for one course curriculum page.
// Only users inside this course room will receive its lecture updates.
export const getLectureCourseRoom = courseId => {
  return `lecture-course:${courseId}`
}

// Normalizes ids because frontend cache matching always compares string ids.
export const buildLectureStatusSocketPayload = ({
  courseId,
  lessonId,
  lectureId,
  videoAssetId,
  status,
  hlsMasterKey = '',
  errorMessage = ''
}) => {
  if (!courseId || !lessonId || !lectureId || !videoAssetId || !status) {
    return null
  }

  return {
    courseId: String(courseId),
    lessonId: String(lessonId),
    lectureId: String(lectureId),
    videoAssetId: String(videoAssetId),
    status,
    hlsMasterKey,
    errorMessage
  }
}

// Emits latest lecture status to teacher watching same course.
// DB is still main source of truth, socket only updates UI in realtime.
export const emitLectureStatusChanged = payload => {
  const socketPayload = buildLectureStatusSocketPayload(payload)

  if (!socketPayload) {
    logger.warn('Lecture status socket event skipped: missing required payload')
    return
  }

  try {
    // Get active Socket.IO server created during server startup.
    const io = getSocketServer()

    // Emit only to current course room, not every connected user.
    const roomName = getLectureCourseRoom(socketPayload.courseId)

    io.to(roomName).emit(
      LECTURE_SOCKET_EVENTS.STATUS_CHANGED,
      socketPayload
    )
  } catch (error) {
    // Socket issue should not break upload/transcode database flow.
    logger.warn(`Lecture status socket event skipped: ${error.message}`)
  }
}
