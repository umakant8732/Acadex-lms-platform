import mongoose from 'mongoose'

import ApiError from '../../../../utils/api-error.js'

import { ROLES } from '../../../auth/constants/auth-constants.js'
import { findActiveEnrollmentByUserAndCourse } from '../../../enrollment/repositories/find-active-enrollment-repository.js'

import { LECTURE_STATUS } from '../../constants/lecture-constants.js'
import { createCloudFrontSignedHlsPlayback } from '../../helpers/create-cloudfront-signed-url.js'
import { findLectureById } from '../../repositories/find-lecture-by-id-repository.js'

// Checks if current student can open this lecture.
const ensureStudentCanPlayLecture = async ({ lecture, user }) => {
  if (user?.role !== ROLES.STUDENT) {
    return
  }

  const enrollment = await findActiveEnrollmentByUserAndCourse(
    user._id,
    lecture.courseId
  )

  const canAccessFullCourse = Boolean(enrollment)
  const canAccessPreviewLecture = lecture.isPreview

  // Not purchased student should only access preview lecture.
  if (!canAccessFullCourse && !canAccessPreviewLecture) {
    throw new ApiError(
      403,
      'This lecture is locked for your current access'
    )
  }
}

// Returns temporary CloudFront signed playback details after access is allowed.
export const getPlaybackAccessService = async ({ lectureId, user }) => {
  if (!mongoose.Types.ObjectId.isValid(lectureId)) {
    throw new ApiError(400, 'Invalid lecture id')
  }

  const lecture = await findLectureById(lectureId)

  if (!lecture) {
    throw new ApiError(404, 'Lecture not found')
  }

  // Only teacher preview or student playback is allowed here.
  if (user?.role === ROLES.TEACHER) {
    // Teacher can preview any ready lecture.
  } else if (user?.role === ROLES.STUDENT) {
    await ensureStudentCanPlayLecture({ lecture, user })
  } else {
    throw new ApiError(403, 'Playback access is not allowed')
  }

  // Player should open only after worker generated HLS and DB is ready.
  if (lecture.status !== LECTURE_STATUS.READY) {
    throw new ApiError(400, 'Lecture video is not ready for playback')
  }

  const videoAsset = lecture.videoAssetId

  if (!videoAsset) {
    throw new ApiError(404, 'Lecture video asset not found')
  }

  // hlsMasterKey points to master.m3u8 stored in private S3.
  if (!videoAsset.hlsMasterKey) {
    throw new ApiError(400, 'Lecture HLS playlist is not available')
  }

  // Create temporary CloudFront signed access for this HLS folder.
  const signedPlayback = createCloudFrontSignedHlsPlayback(
    videoAsset.hlsMasterKey
  )

  return {
    lectureId: String(lecture._id),
    courseId: String(lecture.courseId),
    lessonId: String(lecture.lessonId),
    videoAssetId: String(videoAsset._id),
    status: lecture.status,
    isPreview: lecture.isPreview,
    playback: {
      type: 'hls',
      delivery: 'cloudfront',
      playlistUrl: signedPlayback.playlistUrl,
      signedQuery: signedPlayback.signedQuery,
      expiresAt: signedPlayback.expiresAt
    }
  }
}
