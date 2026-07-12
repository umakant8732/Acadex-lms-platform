import mongoose from 'mongoose'
import ApiError from '../../../../utils/api-error.js'
import { logger } from '../../../../utils/logger.js'
import { deleteCourseById } from '../../repositories/delete-course-repository.js'
import { clearPublishedCoursesCache } from '../../redis/published-courses-redis.js'
import { clearCourseDetailsCache } from '../../redis/course-details-redis.js'
import { addPurgeLectureMediaJob } from '../../../lecture/jobs/purge-lecture-media-job.js'


export const deleteCourseService = async (courseId) => {
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
        throw new ApiError(400, 'Invalid course id')
    }

    const course = await deleteCourseById(courseId)
    if(!course){
        throw new ApiError(
            404,
            'Course not found'
        )
    }

    // Queue S3/DB background cleanup task via BullMQ
    addPurgeLectureMediaJob({ courseId }).catch(error => {
        logger.error(`Failed to queue S3 cleanup on course delete for courseId=${courseId}: ${error.message}`)
    })


    await Promise.all([
        clearPublishedCoursesCache(),
        clearCourseDetailsCache(courseId)
    ])

    logger.info(`Invalidated course caches after delete for courseId: ${courseId}`)

    return course
}
