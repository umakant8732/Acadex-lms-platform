import Lecture from "../../models/lecture-model.js";
import VideoAsset from "../../models/video-asset-model.js";
import { deleteS3Object, deleteS3Directory } from '../../helpers/s3-delete-helper.js'
import { logger } from "../../../../utils/logger.js";


/*
-extracts the s3 folder prefix path from an object key.
-example : courses/12/hls/master.m3u8" -> "courses/12/hls"
*/

const getFolderPrefix = (key) => {
    const lastIndex = key.lastIndexOf('/')
    if (lastIndex === -1) return ''
    return key.substring(0, lastIndex)
}

/*
-main coordinator helper to delete  s3 files and delete DB records for lecture.
-can clean up assets either by a list of lessoIds or by a courseId
*/

export const cleanupLectureAssets = async ({ lessonIds, courseId }) => {
    try {
        let query = {}

        //choose database filter query depending on whether we delete specific lessons or the entire course

        if (lessonIds && lessonIds.length > 0) {
            query = { lessonId: { $in: lessonIds } }
        }
        else if (courseId) {
            query = { courseId }
        }
        else {
            return //safe exists if no delete parameters are provided
        }

        //-fetch matching lecture records and populate their associated video asset details
        const lectures = await
        Lecture.find(query).populate('videoAssetId')

        if (lectures.length === 0) {
            logger.info(`Lecture Cleanup: No lecture found in database for query: ${JSON.stringify(query)}`)
            return
        }

        logger.info(`Lecture Cleanup: Found ${lectures.length} lectures. Starting S3 media purge...`)

        //map over each lecture record and prepare delete promises
        const cleanupPromises = lectures.map(async (lecture) => {
            const videoAsset = lecture.videoAssetId

            if(videoAsset) {
                // a. delete the raw uploaded video(.mp4) from s3
                if(videoAsset.originalKey) {
                    await deleteS3Object(videoAsset.originalKey)
                }

                // b. delete the processed hls segments folder from s3
                if(videoAsset.hlsMasterKey) {
                    const hlsFolder = getFolderPrefix(videoAsset.hlsMasterKey)
                    if(hlsFolder){
                        await deleteS3Directory(hlsFolder)
                    }
                }

                // c. delete the videoAsset document record from mongodb
                await VideoAsset.findByIdAndDelete(videoAsset._id)
                logger.info(`Lecture Cleanup: Deleted VideoAsset record: ${videoAsset._id}`)
            }

            // d. delete the lecture document record from mongodb
            await Lecture.findByIdAndDelete(lecture._id)
              logger.info(`Lecture Cleanup: Deleted Lecture record: ${lecture._id}`)
        })

        //process all deletion parallely using Promise.allSettled to prevent failure from blocking other files
        const results = await Promise.allSettled(cleanupPromises)
        const fulfilled = results.filter((r) => r.status === 'fulfilled').length
        const rejected = results.filter((r) => r.status === 'rejected').length

        logger.info(`Lecture Cleanup: Completed. successful cleanup: ${fulfilled}, Failed:${rejected}`)
    } catch (error) {
         logger.error(`Lecture Cleanup Error: Failed to run cleanup pipeline. Msg: ${error.message}`) 
    }
}