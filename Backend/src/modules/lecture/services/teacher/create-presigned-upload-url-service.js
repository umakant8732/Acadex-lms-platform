import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import ApiError from '../../../../utils/api-error.js'

import {
  s3BucketName,
  s3Client,
  s3UploadUrlExpiresIn
} from '../../../../config/aws-s3.js'

import {
  LECTURE_STATUS,
  VIDEO_ASSET_STATUS
} from '../../constants/lecture-constants.js'

import { findCourseCurriculumById } from '../../repositories/find-course-curriculum-repository.js'
import { findLectureByLesson } from '../../repositories/find-lecture-by-lesson-repository.js'
import { createLecture } from '../../repositories/create-lecture-repository.js'
import { createVideoAsset } from '../../repositories/create-video-asset-repository.js'
import { updateLectureById } from '../../repositories/update-lecture-repository.js'
import { buildOriginalVideoS3Key } from '../../helpers/build-s3-key.js'

// Creates a secure, temporary S3 presigned upload URL for one course lesson video.

export const createPresignedUploadUrlService = async payload => {
  const { courseId, sectionId, lessonId, fileName, mimeType, size } = payload

  const course = await findCourseCurriculumById(courseId)

  if (!course) {
    throw new ApiError(404, 'Course not found')
  }

  // Ensures teacher is uploading video to a section that belongs to this course.
  const selectedSection = (course.syllabus ?? []).find(
    section => String(section._id) === String(sectionId)
  )

  if (!selectedSection) {
    throw new ApiError(404, 'Section not found in this course')
  }

  // Ensures teacher is uploading video to a lesson that belongs to the selected section.
  const selectedLesson = (selectedSection.lessons ?? []).find(
    lesson => String(lesson._id) === String(lessonId)
  )

  if (!selectedLesson) {
    throw new ApiError(404, 'Lesson not found in this section')
  }

  const existingLecture = await findLectureByLesson({
    courseId,
    lessonId
  })

  if (existingLecture?.videoAssetId) {
    throw new ApiError(
      409,
      'This lesson already has a video. Replace video flow will be added separately'
    )
  }

  const originalKey = buildOriginalVideoS3Key({
    courseId,
    lessonId,
    fileName
  })

  // Creates the lesson-level lecture record before the browser uploads the file.
  const lecture =
    existingLecture ||
    (await createLecture({
      courseId,
      sectionId,
      lessonId,
      status: LECTURE_STATUS.UPLOAD_PENDING
    }))

  // Stores original file metadata and S3 object key.
  const videoAsset = await createVideoAsset({
    lectureId: lecture._id,
    courseId,
    originalKey,
    fileName,
    mimeType,
    size,
    status: VIDEO_ASSET_STATUS.UPLOAD_PENDING
  })

  await updateLectureById(lecture._id, {
    videoAssetId: videoAsset._id,
    status: LECTURE_STATUS.UPLOAD_PENDING
  })

  const putObjectCommand = new PutObjectCommand({
    Bucket: s3BucketName,
    Key: originalKey,
    ContentType: mimeType
  })

  // Creates a short-lived signed URL. Frontend can upload directly to S3 using this URL.
  const presignedUploadUrl = await getSignedUrl(s3Client, putObjectCommand, {
    expiresIn: s3UploadUrlExpiresIn
  })

  // Frontend will use this payload to upload the file and complete the upload flow.
  return {
    presignedUploadUrl,
    lectureId: lecture._id,
    videoAssetId: videoAsset._id,
    originalKey,
    expiresIn: s3UploadUrlExpiresIn
  }
}
