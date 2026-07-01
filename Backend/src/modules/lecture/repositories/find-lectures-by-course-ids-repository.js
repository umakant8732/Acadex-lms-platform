import Lecture from '../models/lecture-model.js'

// Loads active lectures across many courses so student card preview info can be built.
export const findLecturesByCourseIds = async (courseIds = []) => {
  if (!courseIds.length) {
    return []
  }

  return await Lecture.find({
    courseId: { $in: courseIds },
    delete: { $ne: true }
  }).sort({ createdAt: 1 })
}
