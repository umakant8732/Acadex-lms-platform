import { Queue } from 'bullmq'

import { bullMQConnection } from '../../../config/bullmq.js'
import { LECTURE_TRANSCODE_QUEUE_NAME } from '../constants/lecture-constants.js'

export {
  LECTURE_TRANSCODE_JOBS,
  LECTURE_TRANSCODE_QUEUE_NAME
} from '../constants/lecture-constants.js'

// Stores lecture background jobs in Redis.
export const lectureTranscodeQueue = new Queue(LECTURE_TRANSCODE_QUEUE_NAME, {
  connection: bullMQConnection
})
