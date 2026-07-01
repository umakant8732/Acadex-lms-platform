import Lecture from '../models/lecture-model.js'

//fetch all active lectures of a Course so that we can merge them with course syllabus

export const findLectureByCourse = async courseId => {
  return await Lecture.find({
    courseId,
    delete: { $ne: true }
  }).sort({ createdAt: 1 })
}
