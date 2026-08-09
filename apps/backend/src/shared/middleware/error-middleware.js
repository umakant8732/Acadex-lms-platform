import { StatusCodes } from 'http-status-codes'

import { logger } from '../utils/logger.js'

const errorMiddleware = (
  err,
  req,
  res,
  next
) => {
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR

  let message = err.message || 'Internal Server Error'

  logger.error(`${req.method} ${req.originalUrl} - ${message}`)

  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || []
  })
}

export default errorMiddleware