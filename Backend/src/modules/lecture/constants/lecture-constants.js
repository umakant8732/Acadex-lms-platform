export const LECTURE_STATUS = Object.freeze({
  UPLOAD_PENDING: 'upload_pending',
  UPLOADING: 'uploading',
  PROCESSING: 'processing',
  READY: 'ready',
  FAILED: 'failed'
})

export const VIDEO_ASSET_STATUS = Object.freeze({
  UPLOAD_PENDING: 'upload_pending',
  UPLOADING: 'uploading',
  PROCESSING: 'processing',
  READY: 'ready',
  FAILED: 'failed'
})

export const LECTURE_TRANSCODE_QUEUE_NAME = 'lecture-transcode-queue'

export const LECTURE_TRANSCODE_JOBS = Object.freeze({
  PROCESS_VIDEO: 'process-video',
  CLEANUP_EXPIRED_UPLOAD_PENDING: 'cleanup-expired-upload-pending'
})
