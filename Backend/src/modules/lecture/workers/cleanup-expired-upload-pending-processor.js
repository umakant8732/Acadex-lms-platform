import { logger } from '../../../utils/logger.js'

import { cleanupExpiredUploadPendingService } from '../services/system/cleanup-expired-upload-pending-service.js'

// Runs cleanup for abandoned upload sessions.
export const processExpiredUploadPendingCleanupJob = async () => {
  const cleanupResult = await cleanupExpiredUploadPendingService()

  logger.info(
    `Expired upload_pending cleanup completed: ${cleanupResult.expiredCount}`
  )

  return cleanupResult
}
