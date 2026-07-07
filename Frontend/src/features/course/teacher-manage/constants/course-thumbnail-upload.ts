export const allowedCourseThumbnailMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/webp'
] as const

export const courseThumbnailAcceptAttribute =
  allowedCourseThumbnailMimeTypes.join(',')

export const maxCourseThumbnailUploadSize = 5 * 1024 * 1024 // 5 MB
