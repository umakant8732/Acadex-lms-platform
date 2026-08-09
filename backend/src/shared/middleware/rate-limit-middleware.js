import rateLimit from 'express-rate-limit'



export const globalLimiter = rateLimit({

  windowMs: 15 * 60 * 1000,

  max: 100,

  message: {
    success: false,
    message:
      'Too many requests'
  }
})



export const authLimiter = rateLimit({

  windowMs: 10 * 60 * 1000,

  max: 5,

  message: {
    success: false,
    message:
      'Too many login attempts'
  }
})



export const uploadLimiter = rateLimit({

  windowMs: 15 * 60 * 1000,

  max: 20,

  message: {
    success: false,
    message:
      'Upload limit exceeded'
  }
})