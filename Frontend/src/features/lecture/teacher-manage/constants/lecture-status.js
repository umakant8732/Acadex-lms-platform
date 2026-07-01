// Shared lecture statuses used by curriculum UI and socket updates.
export const LECTURE_STATUS = Object.freeze({
  UPLOAD_PENDING: 'upload_pending',
  UPLOADING: 'uploading',
  PROCESSING: 'processing',
  READY: 'ready',
  FAILED: 'failed'
})

// Helps UI disable upload action while backend is processing video.
export const isLectureProcessing = status => {
  return status === LECTURE_STATUS.PROCESSING
}

// Helps UI show replace action only after video is fully playable.
export const isLectureReady = status => {
  return status === LECTURE_STATUS.READY
}

// Upload pending means backend created session but original upload was not completed.
export const isLectureUploadPending = status => {
  return status === LECTURE_STATUS.UPLOAD_PENDING
}

// Helps UI show failed state without starting unsupported retry flow.
export const isLectureFailed = status => {
  return status === LECTURE_STATUS.FAILED
}

// Current flow supports first upload only when lesson has no lecture status.
export const canStartFirstLectureUpload = status => {
  return !status
}
