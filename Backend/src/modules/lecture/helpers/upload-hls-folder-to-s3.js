// Reads local file in chunks, so large segments do not load fully in memory.
import { createReadStream } from 'node:fs'

// Reads generated HLS file names from local output folder.
import { readdir } from 'node:fs/promises'

// Builds safe local file paths across Windows/Linux.
import path from 'node:path'

// Uploads one file/object to S3.
import { PutObjectCommand } from '@aws-sdk/client-s3'

// S3 client and bucket name from app config.
import { s3BucketName, s3Client } from '../../../config/aws-s3.js'

// Gives correct content type for HLS playback files.
const getHlsContentType = fileName => {
  if (fileName.endsWith('.m3u8')) {
    return 'application/vnd.apple.mpegurl'
  }

  if (fileName.endsWith('.ts')) {
    return 'video/mp2t'
  }

  return 'application/octet-stream'
}

// Uploads generated HLS playlist and segment files to S3.
export const uploadHlsFolderToS3 = async ({ hlsOutputDir, hlsBaseKey }) => {
  // Get local HLS files, like master.m3u8 and segment_000.ts.
  const fileNames = await readdir(hlsOutputDir)
  const uploadedFiles = []

  // Traffic signal setup: Max 5 concurrent uploads at a time
  const BATCH_SIZE = 5

  for (let i = 0; i < fileNames.length; i += BATCH_SIZE) {
    const batch = fileNames.slice(i, i + BATCH_SIZE)

    // Process current batch of 5 files in parallel
    const batchResults = await Promise.all(
      batch.map(async fileName => {
        const localFilePath = path.join(hlsOutputDir, fileName)
        const s3Key = `${hlsBaseKey}/${fileName}`

        await s3Client.send(
          new PutObjectCommand({
            Bucket: s3BucketName,
            Key: s3Key,
            Body: createReadStream(localFilePath),
            ContentType: getHlsContentType(fileName)
          })
        )

        return {
          fileName,
          key: s3Key
        }
      })
    )

    // Collect results of the uploaded batch
    uploadedFiles.push(...batchResults)
  }

  // Master playlist is the entry file that player will load later.
  const masterPlaylist = uploadedFiles.find(
    file => file.fileName === 'master.m3u8'
  )

  return {
    hlsMasterKey: masterPlaylist?.key ?? '',
    uploadedFiles
  }
}

