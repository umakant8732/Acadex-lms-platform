import VideoAsset from '../models/video-asset-model.js'

import { VIDEO_ASSET_STATUS } from '../constants/lecture-constants.js'

// Finds upload sessions that never reached complete-upload.
export const findExpiredUploadPendingVideoAssets = async expiryDate => {
  return await VideoAsset.find({
    status: VIDEO_ASSET_STATUS.UPLOAD_PENDING,
    createdAt: {
      $lte: expiryDate
    }
  })
}
