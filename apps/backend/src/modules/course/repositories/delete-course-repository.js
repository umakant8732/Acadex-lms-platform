import Course from '../models/course-model.js'

//here we updated just record not deleting the course actually
export const deleteCourseById = async courseId => {
  return await Course.findOneAndUpdate(
    {
      _id: courseId,
      delete: { $ne: true }
    },
    { delete: true },
    { new: true }
  )
}
