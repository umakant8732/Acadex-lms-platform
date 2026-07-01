import {
  LECTURE_TRANSCODE_JOBS,
  lectureTranscodeQueue
} from '../queues/transcode-queue.js'

const cleanupJobOptions = {
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: 10000
  },
  removeOnComplete: true,
  removeOnFail: 100
}

// Adds cleanup job for expired upload_pending sessions.
export const addExpiredUploadPendingCleanupJob = async () => {
  return await lectureTranscodeQueue.add(
    LECTURE_TRANSCODE_JOBS.CLEANUP_EXPIRED_UPLOAD_PENDING,
    {},
    cleanupJobOptions
  )
}
