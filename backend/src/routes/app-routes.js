import { Router } from 'express'

import authRoutes from '../modules/auth/routes/auth-routes.js'
import courseRoutes from '../modules/course/routes/course-routes.js'
import lectureRoutes from '../modules/lecture/routes/lecture-routes.js'
import paymentRoutes from '../modules/payment/routes/payment-routes.js'

const router = Router()

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running'
  })
})

router.use('/auth', authRoutes)
router.use('/course', courseRoutes)
router.use('/lecture', lectureRoutes)
router.use('/payment', paymentRoutes)

export default router
