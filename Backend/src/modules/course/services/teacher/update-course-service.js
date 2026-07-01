import mongoose from 'mongoose'
import ApiError from '../../../../utils/api-error.js'
import { logger } from '../../../../utils/logger.js'

import { updateCourseById } from '../../repositories/update-course-repository.js'
import { clearPublishedCoursesCache } from '../../redis/published-courses-redis.js'
import { clearCourseDetailsCache } from '../../redis/course-details-redis.js'
import { normalizeCoursePayload } from '../../helpers/normalize-course-syllabus.js'

export const updateCourseService = async (courseId, updatedData) => {
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, 'Invalid course id')
  }

  const normalizedData = normalizeCoursePayload(updatedData)

  const updatedCourse = await updateCourseById(courseId, normalizedData)
  if (!updatedCourse) {
    throw new ApiError(404, 'Course not found')
  }

  await Promise.all([
    clearPublishedCoursesCache(),
    clearCourseDetailsCache(courseId)
  ])

  logger.info(
    `Invalidated course caches after update for courseId: ${courseId}`
  )

  return updatedCourse
}
