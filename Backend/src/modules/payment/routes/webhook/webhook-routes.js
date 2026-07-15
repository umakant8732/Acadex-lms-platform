import { Router } from 'express'
import { handleRazorpayWebhook } from '../../controllers/webhook/webhook-controller.js'

const router = Router()

// Razorpay webhook POST target
router.post('/webhook', handleRazorpayWebhook)

export default router
