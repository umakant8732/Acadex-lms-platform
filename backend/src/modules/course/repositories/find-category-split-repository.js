import Enrollment from '../../enrollment/models/enrollment-model.js'

export const findCategorySplit = async () => {
  return await Enrollment.aggregate([
    {
      $lookup: {
        from: 'courses',
        localField: 'courseId',
        foreignField: '_id',
        as: 'course'
      }
    },
    {
      $unwind: '$course'
    },
    {
      $group: {
        _id: '$course.category',
        count: { $sum: 1 }
      }
    },
    {
      $sort: { count: -1 }
    }
  ])
}
