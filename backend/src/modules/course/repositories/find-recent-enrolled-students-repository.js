import Enrollment from '../../enrollment/models/enrollment-model.js'

export const findRecentEnrolledStudents = async (limit = 5) => {
  return await Enrollment.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate({
      path: 'userId',
      select: 'fullName email avatar'
    })
    .populate({
      path: 'courseId',
      select: 'title category'
    })
    .lean()
}
