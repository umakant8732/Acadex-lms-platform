import { findTopPerformingCourses } from '../../repositories/find-top-performing-courses-repository.js'

export const getTopPerformingCoursesService = async (limit = 5) => {
  const rawCourses = await findTopPerformingCourses(limit)

  const topCourses = rawCourses.map((course) => {
    const revenueInRupees = (course.revenue || 0) / 100

    return {
      id: course._id,
      title: course.title,
      category: course.category || 'General',
      sales: course.sales || 0,
      revenueAmount: revenueInRupees,
      revenue: `₹ ${revenueInRupees.toLocaleString('en-IN')}`,
      rating: '4.9'
    }
  })

  return { topCourses }
}
