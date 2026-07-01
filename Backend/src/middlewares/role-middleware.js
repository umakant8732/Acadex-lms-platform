import ApiError from "../utils/api-error.js" 
 const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, 'Access denied'))
    }

    next()
  }
}

export default roleMiddleware
