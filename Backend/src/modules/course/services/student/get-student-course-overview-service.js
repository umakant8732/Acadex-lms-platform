import mongoose from 'mongoose'

import ApiError from '../../../../utils/api-error.js'
import { findActiveEnrollmentByUserAndCourse } from '../../../enrollment/repositories/find-active-enrollment-repository.js'

import { buildStudentCourseAccess } from '../../helpers/build-student-course-access.js'
import { mapStudentCourseOverview } from '../../helpers/map-student-course-overview.js'
import { findCourseById } from '../../repositories/find-course-by-id-repository.js'

// Gets one published course and shapes it with real student access.
export const getStudentCourseOverviewService = async ({
  userId,
  courseId
}) => {
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, 'Invalid course id')
  }

  const course = await findCourseById(courseId)

  // Student should not see deleted or unpublished course here.
  if (!course || !course.isPublished) {
    throw new ApiError(404, 'Course not found')
  }

  const enrollment = await findActiveEnrollmentByUserAndCourse(
    userId,
    courseId
  )

  const access = buildStudentCourseAccess({ enrollment })

  return mapStudentCourseOverview(course, access)
}
