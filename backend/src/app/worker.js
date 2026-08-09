import { connectDB } from '../config/database.js'
import { connectRedis } from '../config/redis.js'
import { logger } from '../shared/utils/logger.js'
import '../workers/auth-email-worker.js'
import '../workers/transcode-worker.js'
import { startExpiredUploadPendingCleanupSchedule } from '../jobs/cleanup-expired-upload-pending-schedule.js'

const startWorker = async () => {
  try {
    await connectDB()
    await connectRedis()

    // Starts periodic cleanup only in worker process.
    startExpiredUploadPendingCleanupSchedule()

    logger.info('Background worker started successfully')
  } catch (error) {
    logger.error(`Worker Startup Error: ${error.message}`)

    process.exit(1)
  }
}

startWorker()
