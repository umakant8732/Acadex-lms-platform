import redisClient from '../../../config/redis.js'
import { logger } from '../../../utils/logger.js'
import {
  buildLectureStatusSocketPayload,
  emitLectureStatusChanged
} from './lecture-events-socket.js'

const LECTURE_STATUS_REDIS_CHANNEL = 'lecture:status:changed'

let lectureStatusSubscriber = null

// Publishes lecture status so worker process can notify web process safely.
export const publishLectureStatusChanged = async payload => {
  const socketPayload = buildLectureStatusSocketPayload(payload)

  if (!socketPayload) {
    logger.warn('Lecture status publish skipped: missing required payload')
    return
  }

  await redisClient.publish(
    LECTURE_STATUS_REDIS_CHANNEL,
    JSON.stringify(socketPayload)
  )
}

// Web server subscribes once and turns Redis events into real socket emits.
export const startLectureStatusSocketSubscriber = async () => {
  if (lectureStatusSubscriber?.isOpen) {
    return
  }

  lectureStatusSubscriber = redisClient.duplicate()

  lectureStatusSubscriber.on('error', error => {
    logger.error(`Lecture status subscriber error: ${error.message}`)
  })

  await lectureStatusSubscriber.connect()

  await lectureStatusSubscriber.subscribe(
    LECTURE_STATUS_REDIS_CHANNEL,
    message => {
      try {
        const payload = JSON.parse(message)
        emitLectureStatusChanged(payload)
      } catch (error) {
        logger.warn(`Lecture status subscriber skipped message: ${error.message}`)
      }
    }
  )

  logger.info('Lecture status socket subscriber started')
}
