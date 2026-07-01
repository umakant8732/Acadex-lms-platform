import Enrollment from '../models/enrollment-model.js'

import { ENROLLMENT_STATUS } from '../constants/enrollment-constants.js'

// Loads active enrollments for one student across many courses.
export const findActiveEnrollmentsByUserAndCourseIds = async (
  userId,
  courseIds = []
) => {
  if (!courseIds.length) {
    return []
  }

  return await Enrollment.find({
    userId,
    courseId: { $in: courseIds },
    status: ENROLLMENT_STATUS.ACTIVE
  })
}