import { StatusCodes } from 'http-status-codes'

import { logger } from '../utils/logger.js'

const errorMiddleware = (
  err,
  req,
  res,
  next
) => {
  const isValidationError = err?.name === 'ZodError' || Array.isArray(err?.issues)
  const validationMessages = isValidationError
    ? err.issues
        .map(issue => issue.message)
        .filter(Boolean)
    : []
  const statusCode = err.statusCode || (
    isValidationError ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR
  )
  const message = isValidationError
    ? 'Please correct the highlighted input and try again'
    : err.message || 'Internal Server Error'

  logger.error(`${req.method} ${req.originalUrl} - ${message}`)

  res.status(statusCode).json({
    success: false,
    message,
    errors: validationMessages.length > 0 ? validationMessages : err.errors || []
  })
}

export default errorMiddleware
