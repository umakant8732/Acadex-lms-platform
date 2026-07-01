import VideoAsset from '../models/video-asset-model.js'

// Finds one video asset by id.
// Used in complete-upload flow to verify uploaded file metadata.
export const findVideoAssetById = async videoAssetId => {
  return await VideoAsset.findById(videoAssetId)
}