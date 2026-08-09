import { Router } from 'express'

import authMiddleware from '../../../../shared/middleware/auth-middleware.js'
import roleMiddleware from '../../../../shared/middleware/role-middleware.js'
import validate from '../../../../shared/middleware/validate-middleware.js'

import { ROLES } from '../../../auth/constants/auth-constants.js'

import { createPresignedUploadUrlSchema, completeUploadSchema, retryTranscodeSchema } from '../../validations/video-upload-validation.js'

import { getLectureManageCourses } from '../../controllers/teacher/get-manage-courses-controller.js'
import { getCourseCurriculum } from '../../controllers/teacher/get-course-curriculum-controller.js'
import { createPresignedUploadUrl } from '../../controllers/teacher/create-presigned-upload-url-controller.js'
import { completeUpload } from '../../controllers/teacher/complete-upload-controller.js'
import { getPlaybackAccess } from '../../controllers/shared/get-playback-access-controller.js'
import { retryTranscode } from '../../controllers/teacher/retry-transcode-controller.js'
import { togglePreviewLecture } from '../../controllers/teacher/toggle-preview-lecture-controller.js'
import { toggleLecturePreviewSchema } from '../../validations/toggle-preview-lecture-validation.js'


const router = Router()

//teacher only routes

router.get(
  '/manage-courses',
  authMiddleware,
  roleMiddleware(ROLES.TEACHER),
  getLectureManageCourses
)

router.get(
  '/manage-courses/:courseId/curriculum',
  authMiddleware,
  roleMiddleware(ROLES.TEACHER),
  getCourseCurriculum
)

router.post(
  '/uploads/presigned-url',
  authMiddleware,
  roleMiddleware(ROLES.TEACHER),
  validate(createPresignedUploadUrlSchema),
  createPresignedUploadUrl
)


router.post(
  '/uploads/complete',
  authMiddleware,
  roleMiddleware(ROLES.TEACHER),
  validate(completeUploadSchema),
  completeUpload
)

router.post(
  '/upload/retry',
  authMiddleware,
  roleMiddleware(ROLES.TEACHER),
  validate(retryTranscodeSchema),
  retryTranscode
)

router.get(
  '/playback-access/:lectureId',
  authMiddleware,
  roleMiddleware(ROLES.TEACHER),
  getPlaybackAccess
)

router.patch(
  '/preview',
  authMiddleware,
  roleMiddleware(ROLES.TEACHER),
  validate(toggleLecturePreviewSchema),
  togglePreviewLecture
)


export default router
