import { Router } from 'express'

import teacherLectureRoutes from './teacher/teacher-lecture-routes.js'
import studentLectureRoutes from './student/student-lecture-routes.js'

const router = Router()

// Keeps teacher APIs unchanged for current frontend integration.
router.use('/', teacherLectureRoutes)

// Student lecture APIs live under /lecture/student/*
router.use('/student', studentLectureRoutes)

export default router
