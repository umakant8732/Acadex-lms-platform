import { addExpiredUploadPendingCleanupJob } from './cleanup-expired-upload-pending-job.js'

let isCleanupScheduleStarted = false

// Starts periodic cleanup job scheduler.
export const startExpiredUploadPendingCleanupSchedule = () => {
  if (isCleanupScheduleStarted) {
    return
  }

  isCleanupScheduleStarted = true

  // Run once on server start also.
  void addExpiredUploadPendingCleanupJob()

  // Queues cleanup job every 10 minutes.
  setInterval(() => {
    void addExpiredUploadPendingCleanupJob()
  }, 10 * 60 * 1000)
}