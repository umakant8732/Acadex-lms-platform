import { logger } from '../shared/utils/logger.js'

import { cleanupExpiredUploadPendingService } from '../modules/lecture/services/system/cleanup-expired-upload-pending-service.js'

// Runs cleanup for abandoned upload sessions.
export const processExpiredUploadPendingCleanupJob = async () => {
  const cleanupResult = await cleanupExpiredUploadPendingService()

  logger.info(
    `Expired upload_pending cleanup completed: ${cleanupResult.expiredCount}`
  )

  return cleanupResult
}
