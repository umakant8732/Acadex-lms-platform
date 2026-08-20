import { LECTURE_STATUS } from '../../lecture/constants/lecture-constants.js'

// Extracts course preview summary (only selects ready preview lectures)
export const buildCoursePreviewSummary = lectures => {
  const readyPreviewLectures = lectures.filter(
    lecture => lecture.isPreview && lecture.status === LECTURE_STATUS.READY
  )

  return {
    hasPreviewLessons: readyPreviewLectures.length > 0,
    firstPreviewLessonId: readyPreviewLectures[0]
      ? String(readyPreviewLectures[0].lessonId)
      : null
  }
}

// Mock preview placeholder for enrolled courses where previews are bypassed
export const emptyCoursePreview = {
  hasPreviewLessons: false,
  firstPreviewLessonId: null
}
