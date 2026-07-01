import { Router } from 'express'

import authMiddleware from '../../../../middlewares/auth-middleware.js'
import roleMiddleware from '../../../../middlewares/role-middleware.js'

import { ROLES } from '../../../auth/constants/auth-constants.js'

import { createOrder } from '../../controllers/student/create-order-controller.js'
import { verifyPayment } from '../../controllers/student/verify-payment-controller.js'
import { reportPaymentFailure } from '../../controllers/student/report-payment-failure-controller.js'

const router = Router()

// Student creates payment order for one published course.
router.post(
  '/courses/:courseId/create-order',
  authMiddleware,
  roleMiddleware(ROLES.STUDENT),
  createOrder
)

// Student sends Razorpay success payload here for server-side verification.
router.post(
  '/verify-payment',
  authMiddleware,
  roleMiddleware(ROLES.STUDENT),
  verifyPayment
)

// Student sends Razorpay failure payload here for retry-safe tracking.
router.post(
  '/report-failure',
  authMiddleware,
  roleMiddleware(ROLES.STUDENT),
  reportPaymentFailure
)

export default router
