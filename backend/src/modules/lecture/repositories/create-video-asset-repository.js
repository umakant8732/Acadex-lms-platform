import VideoAsset from '../models/video-asset-model.js'

// Creates a video asset record that stores original video file metadata.
// This document tracks upload, processing, HLS output, and final ready status.

export const createVideoAsset = async payload => {
  return await VideoAsset.create(payload)
}
