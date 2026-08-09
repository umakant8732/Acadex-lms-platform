import path from 'node:path'
import { randomUUID } from 'node:crypto'

const THUMBNAIL_EXTENSION_BY_MIME_TYPE = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp'
}

const sanitizeFileBaseName = fileName => {
  const parsedFileName = path.parse(fileName)

  return parsedFileName.name
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const resolveThumbnailExtension = ({ fileName, mimeType }) => {
  return (
    THUMBNAIL_EXTENSION_BY_MIME_TYPE[mimeType] ||
    path.extname(fileName).toLocaleLowerCase() ||
    '.jpg'
  )
}

// Builds one stable S3 key for a course thumbnail file.
// Separate thumbnails prefix keeps image delivery easy to expose via public CloudFront behavior later.
export const buildCourseThumbnailS3Key = ({
  courseId,
  fileName,
  mimeType
}) => {
  const safeBaseName = sanitizeFileBaseName(fileName) || 'course-thumbnail'
  const fileExtension = resolveThumbnailExtension({ fileName, mimeType })

  return `thumbnails/courses/${courseId}/${randomUUID()}-${safeBaseName}${fileExtension}`
}
