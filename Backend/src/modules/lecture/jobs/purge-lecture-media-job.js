import {
  LECTURE_TRANSCODE_JOBS,
  lectureTranscodeQueue
} from '../queues/transcode-queue.js'

// Configure job options with 3 retry attempts and exponential backoff
const purgeJobOptions = {
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: 5000 // 5 seconds delay before next retry
  },
  removeOnComplete: true,
  removeOnFail: 100
}

/**
 * Adds a lecture media purge task to the background queue.
 * 
 * @param {Object} params
 * @param {string[]} [params.lessonIds] - Array of lesson IDs to clean up
 * @param {string} [params.courseId] - Course ID to clean up
 */
export const addPurgeLectureMediaJob = async ({ lessonIds, courseId }) => {
  return await lectureTranscodeQueue.add(
    LECTURE_TRANSCODE_JOBS.PURGE_LECTURE_MEDIA,
    {
      lessonIds,
      courseId
    },
    purgeJobOptions
  )
}
