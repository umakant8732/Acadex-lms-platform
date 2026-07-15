import { z } from 'zod'

const mongoIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid id')

const allowedVideoMimeTypes = ['video/mp4', 'video/webm', 'video/quicktime']

const MAX_VIDEO_UPLOAD_SIZE = 100 * 1024 * 1024 // 100 MB

//use to validate required parameters for presigned url generation
export const createPresignedUploadUrlSchema = z.object({
  courseId: mongoIdSchema,

  sectionId: mongoIdSchema,

  lessonId: mongoIdSchema,

  fileName: z.string().trim().min(1, 'File name is required'),

  mimeType: z
    .string()
    .trim()
    .refine(
      mimeType => allowedVideoMimeTypes.includes(mimeType),
      'Only MP4, WebM, and MOV videos are allowed'
    ),

  size: z.coerce
    .number()
    .int()
    .positive('File size must be greater than 0')
    .max(MAX_VIDEO_UPLOAD_SIZE, 'Video size cannot be more than 100 MB')
})

//use to validate request body after frontend successfully uploads video  to s3.

export const completeUploadSchema = z.object({
  lectureId: mongoIdSchema,
  videoAssetId: mongoIdSchema,

  //s3 object key where original uploaded video should exist.
  originalKey: z.string().trim().min(1, 'original key is required')
})

//validate required parameter for triggering transcode retry flow

export const retryTranscodeSchema = z.object({
  lectureId: mongoIdSchema
})