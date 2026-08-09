import path from 'path'

import { randomUUID } from 'crypto'

// Converts the original uploaded file name into a safe S3-friendly file name.
// Example: "Intro To React!!.MP4" -> "intro-to-react.mp4"

const sanitizeFileName = fileName => {
  const parsedFileName = path.parse(fileName) //split file into base name and extension

  const safeBaseName = parsedFileName.name
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  const safeExtension = parsedFileName.ext.toLocaleLowerCase()

  return `${safeBaseName || 'video'}${safeExtension}`
}

// Builds the S3 object key for the original uploaded lecture video.
// This keeps videos organized by course and lesson inside the S3 bucket.
export const buildOriginalVideoS3Key = ({ courseId, lessonId, fileName }) => {
  const safeFileName = sanitizeFileName(fileName)
  return `courses/${courseId}/lessons/${lessonId}/original/${randomUUID()}-${safeFileName}`
}

//build s3 folder key where generated HLS files will live
export const buildHlsS3BaseKey = ({ courseId, lessonId, videoAssetId }) => {
  return `courses/${courseId}/lessons/${lessonId}/hls/${videoAssetId}`
}
