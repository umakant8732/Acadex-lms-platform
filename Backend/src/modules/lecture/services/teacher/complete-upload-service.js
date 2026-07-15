import mongoose from 'mongoose'

import { HeadObjectCommand } from '@aws-sdk/client-s3'

import ApiError from '../../../../utils/api-error.js'

import { s3BucketName, s3Client } from '../../../../config/aws-s3.js'
import VideoAsset from '../../models/video-asset-model.js'
import { deleteS3Object, deleteS3Directory } from '../../helpers/s3-delete-helper.js'
import { logger } from '../../../../utils/logger.js'
import { LECTURE_STATUS, VIDEO_ASSET_STATUS } from '../../constants/lecture-constants.js'
import { addLectureTranscodeJob } from '../../jobs/transcode-job.js'
import { findVideoAssetById } from '../../repositories/find-video-asset-by-id-repository.js'
import { updateLectureById } from '../../repositories/update-lecture-repository.js'
import { updateVideoAssetById } from '../../repositories/update-video-asset-repository.js'
import { emitLectureStatusChanged } from '../../sockets/lecture-events-socket.js'

//Helper to extract s3 folder prefix path from an object key
const getFolderPrefix = (key) => {
  const lastIndex = key.lastIndexOf('/')
  if(lastIndex === -1) return ''
  return key.substring(0, lastIndex)
}

// Completes upload after frontend directly sends original video to S3.
// This service only verifies S3 file, updates DB status, and starts processing.
export const completeUploadService = async payload => {
  if (!payload) {
    throw new ApiError(400, 'Upload complete payload is required')
  }

  const { lectureId, videoAssetId, originalKey } = payload

  if (!mongoose.Types.ObjectId.isValid(lectureId)) {
    throw new ApiError(400, 'Invalid lecture id')
  }

  if (!mongoose.Types.ObjectId.isValid(videoAssetId)) {
    throw new ApiError(400, 'Invalid video asset id')
  }

  const videoAsset = await findVideoAssetById(videoAssetId)

  if (!videoAsset) {
    throw new ApiError(404, 'Video asset not found')
  }

  if (String(videoAsset.lectureId) !== String(lectureId)) {
    throw new ApiError(400, 'Video asset does not belong to this lecture')
  }

  if (videoAsset.originalKey !== originalKey) {
    throw new ApiError(400, 'Original key does not match video asset')
  }

  // Verify actual S3 object before marking upload as complete.
  // Without this check, DB can say processing even when file was never uploaded.
  await s3Client.send(
    new HeadObjectCommand({
      Bucket: s3BucketName,
      Key: originalKey
    })
  )

  //find any old video assets linked to this lecture that are being replaced
  const oldVideoAssets = await VideoAsset.find({
    lectureId,
    _id : {$ne: videoAssetId}
  })

  if(oldVideoAssets.length > 0){
    logger.info(`Replaced video flow: Detected ${oldVideoAssets.length} old video assets to cleanup...`)
  }

  //purge old assets from s3 and  mongodb in  the background
  for(const oldAsset of oldVideoAssets){
    if(oldAsset.originalKey){
      deleteS3Object(oldAsset.originalKey).catch(error => {
        logger.error(`Replace Video Flow: Failed to delete old raw video: ${error.message}`)
      })
    }

    if(oldAsset.hlsMasterKey){
      const hlsFolder = getFolderPrefix(oldAsset.hlsMasterKey)
      if(hlsFolder){
        deleteS3Directory(hlsFolder).catch(error => {
          logger.error(`Replace Video Flow: Failed to delete old HLS folder: ${error.message}`)
        })
      }
    }

    await VideoAsset.findByIdAndDelete(oldAsset._id)
     logger.info(`Replace Video Flow: Deleted old VideoAsset DB record: ${oldAsset._id}`)
  }


  const updatedVideoAsset = await updateVideoAssetById(videoAssetId, {
    status: VIDEO_ASSET_STATUS.PROCESSING
  })

  const updatedLecture = await updateLectureById(lectureId, {
    status: LECTURE_STATUS.PROCESSING
  })

  // Notify current course page that backend verified upload and started processing.
  // Socket event is emitted after DB update, so UI receives real persisted status.
  emitLectureStatusChanged({
    courseId: videoAsset.courseId,
    lessonId: updatedLecture.lessonId,
    lectureId: updatedLecture._id,
    videoAssetId: updatedVideoAsset._id,
    status: LECTURE_STATUS.PROCESSING
  })


  // Add background job after DB is processing, so worker can safely transcode video.
  await addLectureTranscodeJob({
    lectureId,
    videoAssetId,
    courseId: videoAsset.courseId,
    lessonId: updatedLecture.lessonId,
    sourceKey: originalKey
  })

  return {
    lecture: updatedLecture,
    videoAsset: updatedVideoAsset
  }


}
