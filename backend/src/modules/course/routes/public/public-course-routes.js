import { Router } from 'express'

import { getCourseDetails } from '../../controllers/public/get-course-details-controller.js'
import { getPublishedCourses } from '../../controllers/public/get-published-courses-controller.js'

const router = Router()

// Public course discovery routes used by landing/public course pages.
router.get('/get-published-courses', getPublishedCourses)
router.get('/get-course-details/:courseId', getCourseDetails)

export default router
