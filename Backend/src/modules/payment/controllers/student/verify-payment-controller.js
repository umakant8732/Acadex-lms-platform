import asyncHandler from '../../../../utils/async-handler.js'
import ApiResponse from '../../../../utils/api-response.js'

import { verifyPaymentService } from '../../services/student/verify-payment-service.js'

// Reads Razorpay success payload and returns final verification result.
export const verifyPayment = asyncHandler(async (req, res) => {
  const {
    paymentAttemptId,
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature
  } = req.body

  const verification = await verifyPaymentService({
    paymentAttemptId,
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature
  })

  return res.status(200).json(
    new ApiResponse(200, 'Payment verified successfully', {
      verification
    })
  )
})
