import { Worker } from 'bullmq'

import { bullMQConnection } from '../../../config/bullmq.js'
import { logger } from '../../../utils/logger.js'
import {
  LECTURE_TRANSCODE_JOBS,
  LECTURE_TRANSCODE_QUEUE_NAME
} from '../queues/transcode-queue.js'
import { processExpiredUploadPendingCleanupJob } from './cleanup-expired-upload-pending-processor.js'
import { processLectureTranscodeJob } from './transcode-processor.js'

const lectureJobProcessors = {
  [LECTURE_TRANSCODE_JOBS.PROCESS_VIDEO]: processLectureTranscodeJob,
  [LECTURE_TRANSCODE_JOBS.CLEANUP_EXPIRED_UPLOAD_PENDING]:
    processExpiredUploadPendingCleanupJob
}

// Listens for lecture background jobs.
export const lectureTranscodeWorker = new Worker(
  LECTURE_TRANSCODE_QUEUE_NAME,
  async job => {
    logger.info(`Lecture background job picked: ${job.name}`)

    const processor = lectureJobProcessors[job.name]

    if (!processor) {
      logger.warn(`Unknown lecture background job: ${job.name}`)
      return
    }

    return await processor(job)
  },
  {
    connection: bullMQConnection
  }
)

lectureTranscodeWorker.on('completed', job => {
  logger.info(`Lecture background job completed: ${job.name}`)
})

lectureTranscodeWorker.on('failed', (job, error) => {
  logger.error(`Lecture background job failed: ${job?.name} - ${error.message}`)
})

lectureTranscodeWorker.on('error', error => {
  logger.error(`Lecture background worker error: ${error.message}`)
})
