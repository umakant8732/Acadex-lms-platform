import type { LectureStatusType } from '../types/teacher-lecture-types'

// Shared lecture statuses used by curriculum UI and socket updates.
export const LECTURE_STATUS = Object.freeze({
  UPLOAD_PENDING: 'upload_pending' as LectureStatusType,
  UPLOADING: 'uploading' as LectureStatusType,
  PROCESSING: 'processing' as LectureStatusType,
  READY: 'ready' as LectureStatusType,
  FAILED: 'failed' as LectureStatusType
})

// Helps UI disable upload action while backend is processing video.
export const isLectureProcessing = (status?: LectureStatusType | null): boolean => {
  return status === LECTURE_STATUS.PROCESSING
}

// Helps UI show replace action only after video is fully playable.
export const isLectureReady = (status?: LectureStatusType | null): boolean => {
  return status === LECTURE_STATUS.READY
}

// Upload pending means backend created session but original upload was not completed.
export const isLectureUploadPending = (status?: LectureStatusType | null): boolean => {
  return status === LECTURE_STATUS.UPLOAD_PENDING
}

// Helps UI show failed state without starting unsupported retry flow.
export const isLectureFailed = (status?: LectureStatusType | null): boolean => {
  return status === LECTURE_STATUS.FAILED
}


//allows starting an upload if no video exists, or if it is ready (for replacing), or failed/pending
export const canStartFirstLectureUpload = (status?: LectureStatusType | null): boolean => {
  return (
    !status ||
    status === LECTURE_STATUS.READY ||
    status === LECTURE_STATUS.FAILED ||
    status === LECTURE_STATUS.UPLOAD_PENDING
  )
}
