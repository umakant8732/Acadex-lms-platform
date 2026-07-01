import mongoose from 'mongoose'

import {
  DeleteObjectCommand,
  HeadObjectCommand
} from '@aws-sdk/client-s3'

import ApiError from '../../../../utils/api-error.js'
import { logger } from '../../../../utils/logger.js'

import { s3BucketName, s3Client } from '../../../../config/aws-s3.js'

import { findCourseById } from '../../repositories/find-course-by-id-repository.js'
import { updateCourseById } from '../../repositories/update-course-repository.js'
import { serializeCourseThumbnail } from '../../helpers/serialize-course-thumbnail.js'
import { clearPublishedCoursesCache } from '../../redis/published-courses-redis.js'
import { clearCourseDetailsCache } from '../../redis/course-details-redis.js'

const buildExpectedThumbnailPrefix = courseId => {
  return `thumbnails/courses/${courseId}/`
}

// Verifies uploaded thumbnail exists in S3, saves key in DB, and clears stale caches.
export const completeThumbnailUploadService = async ({
  courseId,
  thumbnailKey
}) => {
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, 'Invalid course id')
  }

  const course = await findCourseById(courseId)

  if (!course) {
    throw new ApiError(404, 'Course not found')
  }

  const expectedThumbnailPrefix = buildExpectedThumbnailPrefix(courseId)

  if (!thumbnailKey.startsWith(expectedThumbnailPrefix)) {
    throw new ApiError(400, 'Thumbnail key does not belong to this course')
  }

  // Confirms browser really uploaded the image before DB is updated.
  await s3Client.send(
    new HeadObjectCommand({
      Bucket: s3BucketName,
      Key: thumbnailKey
    })
  )

  const previousThumbnailKey = course.thumbnailKey ?? ''

  const updatedCourse = await updateCourseById(courseId, {
    thumbnailKey
  })

  if (!updatedCourse) {
    throw new ApiError(404, 'Course not found')
  }

  await Promise.all([
    clearPublishedCoursesCache(),
    clearCourseDetailsCache(courseId)
  ])

  // Old thumbnail is removed only after new key is saved successfully.
  if (previousThumbnailKey && previousThumbnailKey !== thumbnailKey) {
    try {
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: s3BucketName,
          Key: previousThumbnailKey
        })
      )
    } catch (error) {
      logger.warn(
        `Failed to delete old course thumbnail for courseId=${courseId}: ${error.message}`
      )
    }
  }

  logger.info(`Course thumbnail updated for courseId=${courseId}`)

  return serializeCourseThumbnail(updatedCourse)
}
