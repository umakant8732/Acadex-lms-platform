import mongoose from 'mongoose'

import { VIDEO_ASSET_STATUS } from '../constants/lecture-constants.js'

const videoVariantSchema = new mongoose.Schema(
  {
    // Human-readable quality label such as 360p, 720p, or 1080p.
    quality: {
      type: String,
      required: true,
      trim: true
    },

    // S3 key of the HLS playlist generated for this quality.
    playlistKey: {
      type: String,
      required: true,
      trim: true
    },

    width: {
      type: Number,
      default: 0,
      min: 0
    },

    height: {
      type: Number,
      default: 0,
      min: 0
    },

    bitrate: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    _id: false
  }
)

const videoAssetSchema = new mongoose.Schema(
  {
    // Connects this video asset to the lecture record.
    lectureId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lecture',
      required: true,
      index: true
    },

    // Stored for fast course-level video queries.
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
      index: true
    },

    // S3 key of the original uploaded video file.
    originalKey: {
      type: String,
      required: true,
      trim: true
    },

    // S3 key of the generated master HLS playlist.
    hlsMasterKey: {
      type: String,
      default: '',
      trim: true
    },

    // Original file information sent by the browser before upload.
    fileName: {
      type: String,
      required: true,
      trim: true
    },

    mimeType: {
      type: String,
      required: true,
      trim: true
    },

    size: {
      type: Number,
      required: true,
      min: 1
    },

    // Video duration in seconds filled after metadata extraction and transcoding.
    duration: {
      type: Number,
      default: 0,
      min: 0
    },

    // Stores generated HLS variants such as 360p, 720p etc
    variants: {
      type: [videoVariantSchema],
      default: []
    },

    // Tracks upload, transcoding, and final readiness of this video.
    status: {
      type: String,
      enum: Object.values(VIDEO_ASSET_STATUS),
      default: VIDEO_ASSET_STATUS.UPLOAD_PENDING
    },

    // Stores processing failure reason when transcoding fails.
    errorMessage: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
)

const VideoAsset = mongoose.model('VideoAsset', videoAssetSchema)

export default VideoAsset