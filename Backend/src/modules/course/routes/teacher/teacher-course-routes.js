import { Router } from 'express'

import authMiddleware from '../../../../middlewares/auth-middleware.js'
import { ROLES } from '../../../auth/constants/auth-constants.js'
import roleMiddleware from '../../../../middlewares/role-middleware.js'
import validate from '../../../../middlewares/validate-middleware.js'
import validateQuery from '../../../../middlewares/validate-query-middleware.js'

import {
  createCourseSchema,
  updateCourseSchema
} from '../../validations/course-validation.js'
import { changePublishStatusSchema } from '../../validations/change-publish-status-validation.js'
import { manageCourseQuerySchema } from '../../validations/manage-courses-validation.js'
import {
  completeThumbnailUploadSchema,
  createThumbnailPresignedUploadUrlSchema
} from '../../validations/thumbnail-upload-validation.js'

import { createCourse } from '../../controllers/teacher/create-course-controller.js'
import { updateCourse } from '../../controllers/teacher/update-course-controller.js'
import { getManageCourses } from '../../controllers/teacher/get-manage-courses-controller.js'
import { getUnpublishedCourses } from '../../controllers/teacher/get-unpublished-courses-controller.js'
import { deleteCourse } from '../../controllers/teacher/delete-course-controller.js'
import { changePublishStatus } from '../../controllers/teacher/change-publish-status-controller.js'
import { createThumbnailPresignedUploadUrl } from '../../controllers/teacher/create-thumbnail-presigned-upload-url-controller.js'
import { completeThumbnailUpload } from '../../controllers/teacher/complete-thumbnail-upload-controller.js'

const router = Router()

// Teacher routes need authentication and teacher role.
router.post(
  '/create-course',
  authMiddleware,
  roleMiddleware(ROLES.TEACHER),
  validate(createCourseSchema),
  createCourse
)

router.patch(
  '/update-course/:courseId',
  authMiddleware,
  roleMiddleware(ROLES.TEACHER),
  validate(updateCourseSchema),
  updateCourse
)

router.get(
  '/manage-all-courses',
  authMiddleware,
  roleMiddleware(ROLES.TEACHER),
  validateQuery(manageCourseQuerySchema),
  getManageCourses
)

router.get(
  '/get-unpublished-courses',
  authMiddleware,
  roleMiddleware(ROLES.TEACHER),
  getUnpublishedCourses
)

router.post(
  '/thumbnail/presigned-url/:courseId',
  authMiddleware,
  roleMiddleware(ROLES.TEACHER),
  validate(createThumbnailPresignedUploadUrlSchema),
  createThumbnailPresignedUploadUrl
)

router.patch(
  '/thumbnail/complete/:courseId',
  authMiddleware,
  roleMiddleware(ROLES.TEACHER),
  validate(completeThumbnailUploadSchema),
  completeThumbnailUpload
)

router.delete(
  '/delete-course/:courseId',
  authMiddleware,
  roleMiddleware(ROLES.TEACHER),
  deleteCourse
)

router.patch(
  '/change-publish-status/:courseId',
  authMiddleware,
  roleMiddleware(ROLES.TEACHER),
  validate(changePublishStatusSchema),
  changePublishStatus
)

export default router
