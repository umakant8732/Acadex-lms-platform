import { createServer } from 'node:http'

import app from './app.js'
import { env } from '../config/env.js'
import { connectDB } from '../config/database.js'
import { connectRedis } from '../config/redis.js'
import { setupSocketServer } from '../config/socket-server.js'
import { logger } from '../utils/logger.js'
import '../modules/auth/workers/auth-email-worker.js'
import '../modules/lecture/workers/transcode-worker.js'

// Starts periodic cleanup for abandoned lecture uploads.
import { startExpiredUploadPendingCleanupSchedule } from '../modules/lecture/jobs/cleanup-expired-upload-pending-schedule.js'

const startServer = async () => {
  try {
    await connectDB()
    await connectRedis()

    const httpServer = createServer(app)

    // Attach Socket.IO to same HTTP server.
    setupSocketServer(httpServer)

    // Queue cleanup jobs only after Redis is connected.
    startExpiredUploadPendingCleanupSchedule()

    httpServer.listen(env.PORT, () => {
      logger.info(`Server running on port ${env.PORT}`)
    })
  } catch (error) {
    logger.error(`Server Startup Error: ${error.message}`)

    process.exit(1)
  }
}

startServer()
