import { Router } from 'express'

import authMiddleware from '../../../../middlewares/auth-middleware.js'
import roleMiddleware from '../../../../middlewares/role-middleware.js'

import { ROLES } from '../../../auth/constants/auth-constants.js'

import { getCourseCurriculum } from '../../controllers/student/get-course-curriculum-controller.js'
import { getPlaybackAccess } from '../../controllers/shared/get-playback-access-controller.js'

const router = Router()


router.get(
    '/courses/:courseId/curriculum',
    authMiddleware,
    roleMiddleware(ROLES.STUDENT),
    getCourseCurriculum
)

router.get('/playback-access/:lectureId', authMiddleware, roleMiddleware(ROLES.STUDENT), getPlaybackAccess)

export default router
