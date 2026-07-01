import mongoose from 'mongoose'

import ApiError from '../../../../utils/api-error.js'
import { logger } from '../../../../utils/logger.js'

import { findCourseById } from '../../repositories/find-course-by-id-repository.js'
import {
  getCourseDetailsFromCache,
  saveCourseDetailsToCache
} from '../../redis/course-details-redis.js'
import { serializeCourseThumbnail } from '../../helpers/serialize-course-thumbnail.js'

export const getCourseDetailsService = async courseId => {
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, 'Invalid course id')
  }

  const cachedCourse = await getCourseDetailsFromCache(courseId)

  if (cachedCourse) {
    logger.info(`Getting course details data from cache for courseId: ${courseId}`)
    return cachedCourse
  }

  logger.info(`Getting course details data from database for courseId: ${courseId}`)
  const course = await findCourseById(courseId)

  if (!course) {
    throw new ApiError(404, 'Course not found')
  }

  const serializedCourse = serializeCourseThumbnail(course)

  await saveCourseDetailsToCache(courseId, serializedCourse)

  return serializedCourse
}
