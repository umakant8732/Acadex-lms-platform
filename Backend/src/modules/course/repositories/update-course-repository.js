import Course from '../models/course-model.js'

export const updateCourseById = async (courseId, updatedData) => {
  return await Course.findOneAndUpdate({
    _id: courseId,
    delete: { $ne: true }
  }, updatedData, {
    new: true,
    runValidators: true
  })
}
