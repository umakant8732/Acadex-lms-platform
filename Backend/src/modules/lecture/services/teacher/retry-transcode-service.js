import mongoose from 'mongoose'
import ApiError from '../../../../utils/api-error.js'
import Lecture from '../../models/lecture-model.js'
import VideoAsset from '../../models/video-asset-model.js'

import { LECTURE_STATUS, VIDEO_ASSET_STATUS } from '../../constants/lecture-constants.js'
import { addLectureTranscodeJob } from '../../jobs/transcode-job.js'
import { emitLectureStatusChanged } from '../../sockets/lecture-events-socket.js'
import { findCourseCurriculumById } from '../../repositories/find-course-curriculum-repository.js'


//retries video transcoding for a failed lecture without requiring re-upload
export const retryTranscodeService = async ({ lectureId }) => {
    if (!mongoose.Types.ObjectId.isValid(lectureId)) {
        throw new ApiError(400, 'Invalid lecture id')
    }

    //fetch lecture details
    const lecture = await Lecture.findById(lectureId)
    if (!lecture) {
        throw new ApiError(404, 'Lecture not found')
    }

    //validate current status is failed
    if (lecture.status !== LECTURE_STATUS.FAILED) {
        throw new ApiError(400, 'Only failed transcoding processes can be retried')
    }

    //fetch associated video asset
    const videoAsset = await VideoAsset.findById(lecture.videoAssetId)
    if (!videoAsset) {
        throw new ApiError(404, 'Video asset not found for this lecture')
    }

    //update statuses to processing in DB

    videoAsset.status = VIDEO_ASSET_STATUS.PROCESSING
    await videoAsset.save()

    lecture.status = LECTURE_STATUS.PROCESSING
    await lecture.save()

    //emit socket event so the ui updates to processing in real time
    emitLectureStatusChanged({
        courseId: lecture.courseId,
        lessonId: lecture.lessonId,
        lectureId: lecture._id,
        videoAssetId: videoAsset._id,
        status: LECTURE_STATUS.PROCESSING
    })

    //push job back to bullmq worker queue for reprocessing
    await addLectureTranscodeJob({
        lectureId: lecture._id,
        videoAssetId: videoAsset._id,
        courseId: lecture.courseId,
        lessonId: lecture.lessonId,
        sourceKey: videoAsset.originalKey
    })

    return {
        success: true,
        message: 'Transcoding  job retried successfully',
        lecture
    }

}