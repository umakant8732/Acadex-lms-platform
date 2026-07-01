import Lecture from '../models/lecture-model.js'

// Finds an active lecture for a specific course lesson.
// Used to prevent duplicate lecture records for the same lesson.

export const findLectureByLesson = async ({ courseId, lessonId }) => {
  return await Lecture.findOne({
    courseId,
    lessonId,
    delete: { $ne: true }
  })
}
