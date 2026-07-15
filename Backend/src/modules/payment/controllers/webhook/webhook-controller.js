import asyncHandler from '../../../../utils/async-handler.js'
import ApiResponse from '../../../../utils/api-response.js'
import { handleRazorpayWebhookService } from '../../services/webhook/webhook-service.js'
import { logger } from '../../../../utils/logger.js'

export const handleRazorpayWebhook = asyncHandler(async (req, res) => {
  const signature = req.headers['x-razorpay-signature']
  const rawBody = req.rawBody ? req.rawBody.toString('utf8') : ''

  if (!signature) {
    logger.warn('Webhook request received without x-razorpay-signature header')
    return res.status(400).json(new ApiResponse(400, 'Signature header is missing'))
  }

  try {
    const result = await handleRazorpayWebhookService({
      rawBody,
      signature,
      payload: req.body
    })

    return res.status(200).json(new ApiResponse(200, result.message, result))
  } catch (error) {
    logger.error(`Webhook Processing Error: ${error.message}`)

    if (error.message === 'Invalid signature') {
      return res.status(400).json(new ApiResponse(400, 'Invalid signature verify failed'))
    }

    return res.status(200).json(new ApiResponse(200, `Error logged: ${error.message}`))
  }
})
