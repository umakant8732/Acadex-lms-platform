import { LECTURE_STATUS, VIDEO_ASSET_STATUS } from '../constants/lecture-constants.js'
import { updateLectureById } from '../repositories/update-lecture-repository.js'
import { updateVideoAssetById } from '../repositories/update-video-asset-repository.js'
import { publishLectureStatusChanged } from '../sockets/lecture-status-pubsub.js'
import { logger } from '../../../utils/logger.js'

/**
 * Handles success DB state updates and WebSocket broadcasts for a ready video.
 */
export const saveTranscodeSuccess = async ({
  lectureId,
  videoAssetId,
  courseId,
  lessonId,
  hlsMasterKey,
  metadata = {}
}) => {
  const { duration = 0, width = 0, height = 0, codec = '', bitrate = 0 } = metadata

  // Save playable master playlist key and mark video ready.
  const updatedVideoAsset = await updateVideoAssetById(videoAssetId, {
    hlsMasterKey,
    status: VIDEO_ASSET_STATUS.READY,
    errorMessage: '',
    duration,
    width,
    height,
    codec,
    bitrate
  })

  // Mark lecture ready after HLS files are uploaded.
  const updatedLecture = await updateLectureById(lectureId, {
    status: LECTURE_STATUS.READY
  })

  logger.info(
    `Lecture video ready: lecture=${lectureId}, asset=${videoAssetId}`
  )

  // Worker cannot emit socket directly, so it publishes via Redis.
  await publishLectureStatusChanged({
    courseId,
    lessonId,
    lectureId: updatedLecture._id,
    videoAssetId: updatedVideoAsset._id,
    status: LECTURE_STATUS.READY,
    hlsMasterKey: updatedVideoAsset.hlsMasterKey,
    errorMessage: ''
  })

  return { updatedLecture, updatedVideoAsset }
}

/**
 * Handles failure DB state updates and WebSocket broadcasts when transcoding fails.
 */
export const saveTranscodeFailure = async ({
  lectureId,
  videoAssetId,
  courseId,
  lessonId,
  errorMessage
}) => {
  const failedVideoAsset = await updateVideoAssetById(videoAssetId, {
    status: VIDEO_ASSET_STATUS.FAILED,
    errorMessage
  })

  const failedLecture = await updateLectureById(lectureId, {
    status: LECTURE_STATUS.FAILED
  })

  await publishLectureStatusChanged({
    courseId,
    lessonId,
    lectureId: failedLecture._id,
    videoAssetId: failedVideoAsset._id,
    status: LECTURE_STATUS.FAILED,
    errorMessage
  })

  return { failedLecture, failedVideoAsset }
}
