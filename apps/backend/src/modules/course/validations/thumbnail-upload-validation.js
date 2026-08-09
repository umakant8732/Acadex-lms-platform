import { z } from 'zod'

import {
  ALLOWED_COURSE_THUMBNAIL_MIME_TYPES,
  MAX_COURSE_THUMBNAIL_UPLOAD_SIZE
} from '../constants/course-thumbnail-constants.js'

export const createThumbnailPresignedUploadUrlSchema = z.object({
  fileName: z.string().trim().min(1, 'File name is required'),

  mimeType: z
    .string()
    .trim()
    .refine(
      mimeType => ALLOWED_COURSE_THUMBNAIL_MIME_TYPES.includes(mimeType),
      'Only JPG, PNG, and WebP thumbnail images are allowed'
    ),

  size: z.coerce
    .number()
    .int()
    .positive('File size must be greater than 0')
    .max(
      MAX_COURSE_THUMBNAIL_UPLOAD_SIZE,
      'Thumbnail image size cannot be more than 5 MB'
    )
})

export const completeThumbnailUploadSchema = z.object({
  thumbnailKey: z.string().trim().min(1, 'Thumbnail key is required')
})
