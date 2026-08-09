import { logger } from '../shared/utils/logger.js'

import { createTranscodeWorkDir } from '../modules/lecture/helpers/create-transcode-work-dir.js'
import { downloadS3ObjectToFile } from '../modules/lecture/helpers/download-s3-object-to-file.js'
import { transcodeVideoToHls } from '../modules/lecture/helpers/transcode-video-to-hls.js'
import { buildHlsS3BaseKey } from '../modules/lecture/helpers/build-s3-key.js'
import { uploadHlsFolderToS3 } from '../modules/lecture/helpers/upload-hls-folder-to-s3.js'
import { removeTranscodeWorkDir } from '../modules/lecture/helpers/remove-transcode-work-dir.js'
import { saveTranscodeSuccess, saveTranscodeFailure } from '../modules/lecture/helpers/save-transcode-results.js'
import { getVideoMetadata } from '../modules/lecture/helpers/get-video-metadata.js'

const isFinalJobAttempt = job => {
  const maxAttempts = job.opts?.attempts ?? 1

  return job.attemptsMade + 1 >= maxAttempts
}

export const processLectureTranscodeJob = async job => {
  const { lectureId, videoAssetId, sourceKey, courseId, lessonId } = job.data
  let activeWorkDir = null

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
    activeWorkDir = workDir

    // Download original video from S3 into temp input file.
    await downloadS3ObjectToFile({
      key: sourceKey,
      filePath: inputFilePath
    })

    logger.info(`Original video downloaded: ${inputFilePath}`)

    // Extract dynamic duration and specs using ffprobe
    const metadata = await getVideoMetadata(inputFilePath)
    logger.info(
      `Video details: duration=${metadata.duration}s, resolution=${metadata.width}x${metadata.height}, codec=${metadata.codec}, bitrate=${metadata.bitrate}`
    )

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

    // Save playable master playlist key and mark video ready in DB / sockets.
    const { updatedLecture, updatedVideoAsset } = await saveTranscodeSuccess({
      lectureId,
      videoAssetId,
      courseId,
      lessonId,
      hlsMasterKey,
      metadata
    })

    return {
      lectureId,
      videoAssetId,
      sourceKey,
      workDir: activeWorkDir,
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

    // Mark failed and publish failed state.
    await saveTranscodeFailure({
      lectureId,
      videoAssetId,
      courseId,
      lessonId,
      errorMessage: error.message
    })

    throw error
  } finally {
    if (activeWorkDir) {
      try {
        await removeTranscodeWorkDir(activeWorkDir)
        logger.info(`Local transcode folder cleaned up: ${activeWorkDir}`)
      } catch (cleanupError) {
        logger.error(`Failed to clean up transcode folder: ${cleanupError.message}`)
      }
    }
  }
}
