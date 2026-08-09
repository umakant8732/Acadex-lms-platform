import VideoAsset from '../models/video-asset-model.js'

//updates video asset status or metadata and returns latest documents

export const updateVideoAssetById = async (videoAssetId, updateData) => {
  return await VideoAsset.findByIdAndUpdate(videoAssetId, updateData, {
    new: true,
    runValidators: true
  })
}
