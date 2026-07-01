import Course from '../models/course-model.js'

export const findCourseById = async courseId => {
  return await Course.findOne({
    _id: courseId,
    delete: { $ne: true }
  })
}
