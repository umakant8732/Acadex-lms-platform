import {
  LECTURE_TRANSCODE_JOBS,
  lectureTranscodeQueue
} from '../queues/transcode-queue.js'

const transcodeJobOptions = {
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: 10000
  },
  removeOnComplete: true,
  removeOnFail: 100
}

// Adds video processing job after original upload is verified.
export const addLectureTranscodeJob = async ({
  lectureId,
  videoAssetId,
  courseId,
  lessonId,
  sourceKey
}) => {
  return await lectureTranscodeQueue.add(
    LECTURE_TRANSCODE_JOBS.PROCESS_VIDEO,
    {
      lectureId,
      videoAssetId,
      courseId,
      lessonId,
      sourceKey
    },
    transcodeJobOptions
  )
}
