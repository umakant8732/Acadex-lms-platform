import asyncHandler from '../../../../utils/async-handler.js'
import ApiResponse from '../../../../utils/api-response.js'

import { createOrderService } from '../../services/student/create-order-service.js'

// Reads logged-in student and course id, then returns checkout-ready order data.
export const createOrder = asyncHandler(async (req, res) => {
  const { courseId } = req.params
  const userId = req.user._id

  const order = await createOrderService({
    userId,
    courseId
  })

  return res.status(201).json(
    new ApiResponse(201, 'Payment order created successfully', {
      order
    })
  )
})
