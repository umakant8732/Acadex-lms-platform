import { Router } from 'express'

import studentPaymentRouter from './student/student-payment-routes.js'

const router = Router()

// Student payment APIs live under /payment/student/*
router.use('/student', studentPaymentRouter)

export default router
