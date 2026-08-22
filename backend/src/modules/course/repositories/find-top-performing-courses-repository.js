import PaymentAttempt from '../../payment/models/payment-attempt-model.js'
import Course from '../models/course-model.js'
import { PAYMENT_ATTEMPT_STATUS } from '../../payment/constants/payment-constants.js'

export const findTopPerformingCourses = async (limit = 5) => {
  // Aggregate courses with fulfilled payments
  const topPaidCourses = await PaymentAttempt.aggregate([
    {
      $match: { status: PAYMENT_ATTEMPT_STATUS.FULFILLED }
    },
    {
      $group: {
        _id: '$courseId',
        sales: { $sum: 1 },
        totalRevenue: { $sum: '$amount' }
      }
    },
    {
      $sort: { sales: -1, totalRevenue: -1 }
    },
    {
      $limit: limit
    },
    {
      $lookup: {
        from: 'courses',
        localField: '_id',
        foreignField: '_id',
        as: 'course'
      }
    },
    {
      $unwind: '$course'
    },
    {
      $project: {
        _id: '$course._id',
        title: '$course.title',
        category: '$course.category',
        sales: '$sales',
        revenue: '$totalRevenue'
      }
    }
  ])

  if (topPaidCourses.length >= limit) {
    return topPaidCourses
  }

  // If fewer courses with sales exist, backfill with other published courses (with 0 sales)
  const existingIds = topPaidCourses.map((c) => c._id)
  const remainingCount = limit - topPaidCourses.length

  const additionalCourses = await Course.find({
    isPublished: true,
    _id: { $nin: existingIds }
  })
    .sort({ createdAt: -1 })
    .limit(remainingCount)
    .select('_id title category')
    .lean()

  const paddedCourses = additionalCourses.map((c) => ({
    _id: c._id,
    title: c.title,
    category: c.category,
    sales: 0,
    revenue: 0
  }))

  return [...topPaidCourses, ...paddedCourses]
}
