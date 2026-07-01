import mongoose from 'mongoose'
import ApiError from '../../../../utils/api-error.js'
import { logger } from '../../../../utils/logger.js'

import { changePublishStatusById } from '../../repositories/change-publish-status-repository.js'
import { clearCourseDetailsCache } from '../../redis/course-details-redis.js'
import { clearPublishedCoursesCache } from '../../redis/published-courses-redis.js'

export const changePublishStatusService = async (courseId, isPublished) => {
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, 'Invalid course id')
  }

  const updateCourse = await changePublishStatusById(courseId, isPublished)

  if (!updateCourse) {
    throw new ApiError(404, 'Course not found')
  }

  await Promise.all([
    clearPublishedCoursesCache(),
    clearCourseDetailsCache(courseId)
  ])

  logger.info(
    `Invalidate course cache after publish status change for courseId : ${updateCourse._id}`
  )

  return updateCourse
}
