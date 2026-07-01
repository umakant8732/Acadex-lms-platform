import { Router } from 'express'

import authMiddleware from '../../../../middlewares/auth-middleware.js'
import roleMiddleware from '../../../../middlewares/role-middleware.js'
import { ROLES } from '../../../auth/constants/auth-constants.js'
import { getStudentCourseLibrary } from '../../controllers/student/get-student-course-library-controller.js'
import { getStudentCourseOverview } from '../../controllers/student/get-student-course-overview-controller.js'

const router = Router()

// Student-only course routes.
router.get(
  '/student/courses',
  authMiddleware,
  roleMiddleware(ROLES.STUDENT),
  getStudentCourseLibrary
)

router.get(
  '/student/courses/:courseId',
  authMiddleware,
  roleMiddleware(ROLES.STUDENT),
  getStudentCourseOverview
)

export default router
