import {
  LECTURE_STATUS,
  VIDEO_ASSET_STATUS
} from '../../constants/lecture-constants.js'
import { findExpiredUploadPendingVideoAssets } from '../../repositories/find-expired-upload-pending-video-assets-repository.js'
import { updateLectureById } from '../../repositories/update-lecture-repository.js'
import { updateVideoAssetById } from '../../repositories/update-video-asset-repository.js'

const UPLOAD_PENDING_EXPIRY_MINUTES = 30

const getUploadPendingExpiryDate = () => {
  return new Date(Date.now() - UPLOAD_PENDING_EXPIRY_MINUTES * 60 * 1000)
}

// Marks old upload_pending records as failed.
export const cleanupExpiredUploadPendingService = async () => {
  const expiryDate = getUploadPendingExpiryDate()

  const expiredVideoAssets =
    await findExpiredUploadPendingVideoAssets(expiryDate)

  const cleanupResults = await Promise.all(
    expiredVideoAssets.map(async videoAsset => {
      await updateVideoAssetById(videoAsset._id, {
        status: VIDEO_ASSET_STATUS.FAILED,
        errorMessage: 'Upload session expired before video upload completed'
      })

      await updateLectureById(videoAsset.lectureId, {
        status: LECTURE_STATUS.FAILED
      })

      return {
        videoAssetId: videoAsset._id,
        lectureId: videoAsset.lectureId
      }
    })
  )

  return {
    expiredCount: cleanupResults.length,
    cleanupResults
  }
}
