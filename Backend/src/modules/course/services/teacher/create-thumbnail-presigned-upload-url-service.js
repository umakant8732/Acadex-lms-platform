import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import mongoose from 'mongoose'

import ApiError from '../../../../utils/api-error.js'

import {
  s3BucketName,
  s3Client,
  s3UploadUrlExpiresIn
} from '../../../../config/aws-s3.js'

import { findCourseById } from '../../repositories/find-course-by-id-repository.js'
import { buildCourseThumbnailS3Key } from '../../helpers/build-course-thumbnail-s3-key.js'

// Creates short-lived S3 upload access for one course thumbnail image.
export const createThumbnailPresignedUploadUrlService = async ({
  courseId,
  fileName,
  mimeType
}) => {
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, 'Invalid course id')
  }

  const course = await findCourseById(courseId)

  if (!course) {
    throw new ApiError(404, 'Course not found')
  }

  const thumbnailKey = buildCourseThumbnailS3Key({
    courseId,
    fileName,
    mimeType
  })

  const putObjectCommand = new PutObjectCommand({
    Bucket: s3BucketName,
    Key: thumbnailKey,
    ContentType: mimeType
  })

  const presignedUploadUrl = await getSignedUrl(s3Client, putObjectCommand, {
    expiresIn: s3UploadUrlExpiresIn
  })

  return {
    presignedUploadUrl,
    thumbnailKey,
    expiresIn: s3UploadUrlExpiresIn
  }
}
