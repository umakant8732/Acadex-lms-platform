import { findRecentEnrolledStudents } from '../../repositories/find-recent-enrolled-students-repository.js'

export const getRecentStudentsService = async (limit = 5) => {
  const rawEnrollments = await findRecentEnrolledStudents(limit)

  const recentStudents = rawEnrollments.map((item) => ({
    id: item._id,
    userId: item.userId?._id,
    name: item.userId?.fullName || 'Enrolled Student',
    email: item.userId?.email || '',
    avatar: item.userId?.avatar || '',
    courseTitle: item.courseId?.title || 'Enrolled Course',
    courseCategory: item.courseId?.category || '',
    enrolledAt: item.createdAt || item.enrolledAt
  }))

  return { recentStudents }
}
