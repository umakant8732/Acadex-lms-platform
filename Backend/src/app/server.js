import { createServer } from 'node:http'

import app from './app.js'
import { env } from '../config/env.js'
import { connectDB } from '../config/database.js'
import { connectRedis } from '../config/redis.js'
import { setupSocketServer } from '../config/socket-server.js'
import { logger } from '../utils/logger.js'

const startServer = async () => {
  try {
    await connectDB()
    await connectRedis()

    const httpServer = createServer(app)

    // Attach Socket.IO to same HTTP server.
    setupSocketServer(httpServer)

    httpServer.listen(env.PORT, () => {
      logger.info(`Server running on port ${env.PORT}`)
    })
  } catch (error) {
    logger.error(`Server Startup Error: ${error.message}`)

    process.exit(1)
  }
}

startServer()
