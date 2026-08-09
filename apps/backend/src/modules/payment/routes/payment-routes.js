import { Router } from 'express'

import studentPaymentRouter from './student/student-payment-routes.js'
import webhookRouter from './webhook/webhook-routes.js'

const router = Router()

// Public webhook routes directly from Razorpay
router.use('/', webhookRouter)

// Student payment APIs live under /payment/student/*
router.use('/student', studentPaymentRouter)

export default router
