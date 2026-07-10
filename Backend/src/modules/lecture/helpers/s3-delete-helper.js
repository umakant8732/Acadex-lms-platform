import { DeleteObjectCommand, ListObjectsV2Command, DeleteObjectsCommand } from '@aws-sdk/client-s3'

import { s3Client, s3BucketName } from '../../../config/aws-s3.js'
import { logger } from '../../../utils/logger.js'

/*
- delete single object (file) from s3 bucket.
- useful for removing the raw uploaded mp4 file
*/

export const deleteS3Object = async (key) => {
    //If key is empty or null, skip deletion to avoid API error
    if (!key) {
        return
    }

    try {
        logger.info(`S3 Objects Cleanup: Attempting to delete file ${key}`)

        //send delete command for the specific key in our s3 bucket
        await s3Client.send(
            new DeleteObjectCommand({
                Bucket: s3BucketName,
                Key: key
            })
        )

        logger.info(`S3 Object Cleanup: Successfully deleted ${key}`)

    } catch (error) {
        logger.error(`S3 Object Cleanup Error: Failed to delete ${key}. Msg: ${error.message}`)
        throw error
    }
}


/*
-Delete a folder (directory) and all its nested files recursiviely from s3 bucket
-require because HLS streams consist of multiple files (.m3u8 and .ts files) inside the folder
-takes param {string} 'dirprefix' -> the s3 directory path/prefix to delete
*/

export const deleteS3Directory = async (dirPrefix) => {
    if (!dirPrefix) {
        return
    }

    //standardize prefix to always end with a slash '/' to prevent deleting matching sibling folder
    const normalizedPrefix = dirPrefix.endsWith('/') ? dirPrefix : `${dirPrefix}/`

    try {
        logger.info(`S3 Directory Cleanup: Initiating recursive delete for prefix: ${normalizedPrefix}`)

        let truncated = true
        let continuationToken

        // Loop until all pages of objects under this folder prefix are fetched and deleted
        while (truncated) {
            //fetch a list of objects that match the folder prefix (max 1000 objects per call)
            const listCommand = new ListObjectsV2Command({
                Bucket: s3BucketName,
                Prefix: normalizedPrefix,
                ContinuationToken: continuationToken
            })

            const listResponse = await s3Client.send(listCommand)
            const objects = listResponse.Contents

            //if files exits in the folder, perform batch deletion
            if (objects && objects.length > 0) {
                const deleteParams = {
                    Bucket: s3BucketName,
                    Delete: {
                        //map the listed objects to the key structure, expected by DeleteOjbectCommand
                        Objects: objects.map((obj) => ({ Key: obj.Key })),

                        //Quite mode hides individual file deletion responses, saving network bandwidth and log spam
                        Quiet: true
                    }
                }

                //send batch delete command to s3
                await s3Client.send(new DeleteObjectsCommand(deleteParams))
                logger.info(`S3 Directory Cleanup: Delete batch of ${objects.length} files from ${normalizedPrefix}`)
            }

            //check if there are more files remaining to fetch (pagination check)
            truncated = listResponse.IsTruncated

            //saves token to load the next page in the next loop iteration
            continuationToken = listResponse.NextContinuationToken
        }

        logger.info(`S3 Directory Cleanup: Successfully deleted all files in directory ${normalizedPrefix}`)

    } catch (error) {
        logger.error(`S3 Directory Cleanup Error: Failed to delete prefix ${normalizedPrefix}. Msg: ${error.message}`)
        throw error
    }
}