import { cleanupLectureAssets } from '../services/teacher/cleanup-lecture-service.js'
import { logger } from '../../../utils/logger.js'

/**
 * Job processor for media purging. Executed inside the BullMQ worker process.
 * 
 * @param {Object} job - BullMQ job containing lessonIds or courseId payload
 */
export const processPurgeLectureMediaJob = async (job) => {
  const { lessonIds, courseId } = job.data

  logger.info(`Queue Worker: Processing S3 media purge job for: ${JSON.stringify(job.data)}`)

  // Call the core cleanup service to delete S3 directories/files and Mongo records
  await cleanupLectureAssets({ lessonIds, courseId })

  logger.info(`Queue Worker: S3 media purge job completed successfully`)
}
