import Razorpay from 'razorpay'

import { env } from './env.js'

//central razorpay client used by payment services
export const razorpayInstance = new Razorpay({
    key_id: env.RAZORPAY_KEY_ID,
    key_secret: env.RAZORPAY_KEY_SECRET
})