import { Server as SocketIoServer } from 'socket.io'

import { env } from './env.js'
import { setSocketServer } from './socket-store.js'
import { logger } from '../utils/logger.js'

// Creates socket server and registers connection events.
export const setupSocketServer = httpServer => {
  const io = new SocketIoServer(httpServer, {
    cors: {
      origin: env.CLIENT_URL,
      credentials: true
    }
  })

  // Store socket server so other files can emit events.
  setSocketServer(io)

  io.on('connection', socket => {
    logger.info(`Socket connected: ${socket.id}`)

    socket.on('lecture:join-course', courseId => {
      if (!courseId) return

      // Teacher joins current course room.
      socket.join(`lecture-course:${courseId}`)
    })

    socket.on('lecture:leave-course', courseId => {
      if (!courseId) return

      // Teacher leaves course room on page change.
      socket.leave(`lecture-course:${courseId}`)
    })

    socket.on('disconnect', () => {
      logger.info(`Socket disconnected: ${socket.id}`)
    })
  })

  return io
}
