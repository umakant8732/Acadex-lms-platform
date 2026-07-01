import { connectDB } from '../config/database.js'
import { connectRedis } from '../config/redis.js'
import { logger } from '../utils/logger.js'
import '../modules/auth/workers/auth-email-worker.js'
import '../modules/lecture/workers/transcode-worker.js'
import { startExpiredUploadPendingCleanupSchedule } from '../modules/lecture/jobs/cleanup-expired-upload-pending-schedule.js'

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
