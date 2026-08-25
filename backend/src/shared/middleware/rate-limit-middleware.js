import rateLimit from 'express-rate-limit'

// 1. GLOBAL LIMITER: Protects the whole server from general scraping and flooding.
// Natural human browsing: ~10-25 requests/min. 1000 requests per 15 mins is generous for humans, lethal for bots.
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false
})

// 2. AUTH LIMITER: Protects login/register from brute-force password guessing.
// Uses IP + Email combination so one user's failure never blocks another account on the same network.
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,                   // 5 failed attempts allowed
  skipSuccessfulRequests: true, // Successful login resets/ignores the counter
  keyGenerator: (req) => {
    const email = req.body?.email ? req.body.email.toLowerCase().trim() : 'anonymous'
    return `${req.ip}_${email}`
  },
  message: {
    success: false,
    message: 'Too many failed login attempts for this account. Please try again after 15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false
})

// 3. OTP & PASSWORD RESET LIMITER: Protects email sending quotas (Nodemailer / SES) from spamming.
export const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3,                  // Max 3 OTP requests in 5 minutes
  keyGenerator: (req) => {
    const email = req.body?.email ? req.body.email.toLowerCase().trim() : 'anonymous'
    return `${req.ip}_otp_${email}`
  },
  message: {
    success: false,
    message: 'Too many OTP requests for this email. Please wait 5 minutes before trying again'
  },
  standardHeaders: true,
  legacyHeaders: false
})

// 4. UPLOAD LIMITER: Protects S3 Presigned URL abuse and prevents EC2 FFmpeg CPU saturation.
export const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15,                  // Max 15 video/thumbnail uploads in 15 minutes
  message: {
    success: false,
    message: 'Upload limit exceeded. Maximum 15 uploads allowed per 15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false
})