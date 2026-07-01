import asyncHandler from '../../../../utils/async-handler.js'
import ApiResponse from '../../../../utils/api-response.js'

import { reportPaymentFailureService } from '../../services/student/report-payment-failure-service.js'

// Reads checkout failure payload and stores it on local payment attempt.
export const reportPaymentFailure = asyncHandler(async (req, res) => {
  const {
    paymentAttemptId,
    razorpayOrderId,
    razorpayPaymentId,
    failureReason,
    failureCode,
    failureSource,
    failureStep,
    failureField
  } = req.body

  const failure = await reportPaymentFailureService({
    paymentAttemptId,
    razorpayOrderId,
    razorpayPaymentId,
    failureReason,
    failureCode,
    failureSource,
    failureStep,
    failureField
  })

  return res.status(200).json(
    new ApiResponse(200, 'Payment failure recorded successfully', {
      failure
    })
  )
})
