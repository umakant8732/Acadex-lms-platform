import { Router } from 'express'

import publicCourseRoutes from './public/public-course-routes.js'
import studentCourseRoutes from './student/student-course-routes.js'
import teacherCourseRoutes from './teacher/teacher-course-routes.js'

const router = Router()

// Keep existing /course API paths while course routes are organized by role.
router.use('/', publicCourseRoutes)
router.use('/', studentCourseRoutes)
router.use('/', teacherCourseRoutes)

export default router
