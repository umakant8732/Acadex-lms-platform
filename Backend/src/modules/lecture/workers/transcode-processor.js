import { logger } from '../../../utils/logger.js'

import {
  LECTURE_STATUS,
  VIDEO_ASSET_STATUS
} from '../constants/lecture-constants.js'
import { updateLectureById } from '../repositories/update-lecture-repository.js'
import { updateVideoAssetById } from '../repositories/update-video-asset-repository.js'
import { createTranscodeWorkDir } from '../helpers/create-transcode-work-dir.js'
import { downloadS3ObjectToFile } from '../helpers/download-s3-object-to-file.js'
import { transcodeVideoToHls } from '../helpers/transcode-video-to-hls.js'
import { buildHlsS3BaseKey } from '../helpers/build-s3-key.js'
import { uploadHlsFolderToS3 } from '../helpers/upload-hls-folder-to-s3.js'
import { removeTranscodeWorkDir } from '../helpers/remove-transcode-work-dir.js'
import { emitLectureStatusChanged } from '../sockets/lecture-events-socket.js'

const isFinalJobAttempt = job => {
  const maxAttempts = job.opts?.attempts ?? 1

  return job.attemptsMade + 1 >= maxAttempts
}

// Runs one lecture video processing job.
export const processLectureTranscodeJob = async job => {
  const { lectureId, videoAssetId, sourceKey, courseId, lessonId } = job.data

  try {
    // Start processing for uploaded source video.
    logger.info(
      `Lecture transcode started: lecture=${lectureId}, asset=${videoAssetId}`
    )

    logger.info(`Source video key: ${sourceKey}`)

    // Create local input/output paths for FFmpeg.
    const { workDir, inputFilePath, hlsOutputDir } = await createTranscodeWorkDir({
      lectureId,
      videoAssetId
    })

    // Download original video from S3 into temp input file.
    await downloadS3ObjectToFile({
      key: sourceKey,
      filePath: inputFilePath
    })

    logger.info(`Original video downloaded: ${inputFilePath}`)
    logger.info(`HLS output folder ready: ${hlsOutputDir}`)

    // Convert downloaded original video into local HLS files.
    const { masterPlaylistPath } = await transcodeVideoToHls({
      inputFilePath,
      hlsOutputDir
    })

    logger.info(`HLS master playlist created: ${masterPlaylistPath}`)

    // Build S3 folder for generated HLS files.
    const hlsBaseKey = buildHlsS3BaseKey({
      courseId,
      lessonId,
      videoAssetId
    })

    // Upload HLS playlist and segments to S3.
    const { hlsMasterKey, uploadedFiles } = await uploadHlsFolderToS3({
      hlsOutputDir,
      hlsBaseKey
    })

    logger.info(`HLS files uploaded to s3 : ${uploadedFiles.length}`)
    logger.info(`HLS master key: ${hlsMasterKey}`)

    // Save playable master playlist key and mark video ready.
    const updatedVideoAsset = await updateVideoAssetById(videoAssetId, {
      hlsMasterKey,
      status: VIDEO_ASSET_STATUS.READY,
      errorMessage: ''
    })

    // Mark lecture ready after HLS files are uploaded.
    const updatedLecture = await updateLectureById(lectureId, {
      status: LECTURE_STATUS.READY
    })

    logger.info(
      `Lecture video ready: lecture=${lectureId}, asset=${videoAssetId}`
    )


    // Notify current course page after HLS key is saved and lecture is ready.
    // Frontend uses this event to show Ready without refreshing curriculum API.
    emitLectureStatusChanged({
      courseId,
      lessonId,
      lectureId: updatedLecture._id,
      videoAssetId: updatedVideoAsset._id,
      status: LECTURE_STATUS.READY,
      hlsMasterKey: updatedVideoAsset.hlsMasterKey,
      errorMessage: ''
    })

    // Remove local files after successful S3 upload and DB update.
    await removeTranscodeWorkDir(workDir)

    logger.info(`Local transcode folder removed: ${workDir}`)

    return {
      lectureId,
      videoAssetId,
      sourceKey,
      workDir,
      inputFilePath,
      hlsOutputDir,
      masterPlaylistPath,
      hlsMasterKey,
      uploadedFiles,
      lecture: updatedLecture,
      videoAsset: updatedVideoAsset
    }
  } catch (error) {
    const currentAttempt = job.attemptsMade + 1
    const maxAttempts = job.opts?.attempts ?? 1

    logger.error(
      `Lecture transcode attempt failed: ${currentAttempt}/${maxAttempts} - ${error.message}`
    )

    if (!isFinalJobAttempt(job)) {
      throw error
    }

    // Mark failed only after all retry attempts are exhausted.
    // Before final attempt, BullMQ will retry so UI should stay Processing.
    const failedVideoAsset = await updateVideoAssetById(videoAssetId, {
      status: VIDEO_ASSET_STATUS.FAILED,
      errorMessage: error.message
    })

    const failedLecture = await updateLectureById(lectureId, {
      status: LECTURE_STATUS.FAILED
    })

    // Notify current course page after DB stores final failed status.
    // Frontend uses this event to show Failed without manual refresh.
    emitLectureStatusChanged({
      courseId,
      lessonId,
      lectureId: failedLecture._id,
      videoAssetId: failedVideoAsset._id,
      status: LECTURE_STATUS.FAILED,
      errorMessage: error.message
    })

    throw error
  }
}
