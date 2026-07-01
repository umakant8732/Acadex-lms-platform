import { Router } from 'express'

import { authLimiter } from '../../../middlewares/rate-limit-middleware.js'
import validate from '../../../middlewares/validate-middleware.js'
import authMiddleware from '../../../middlewares/auth-middleware.js'

import {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  resendOTPSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema
} from '../validations/auth-validation.js'

import { registerUser } from '../controllers/register-user-controller.js'
import { loginUser } from '../controllers/login-user-controller.js'
import { getCurrentUser } from '../controllers/get-current-user-controller.js'
import { verifyEmail } from '../controllers/verify-email-controller.js'
import { resendOTP } from '../controllers/resend-otp-controller.js'
import { refreshToken } from '../controllers/refresh-token-controller.js'
import { logoutUser } from '../controllers/logout-user-controller.js'
import { forgotPassword } from '../controllers/forgot-password-controller.js'
import { resetPassword } from '../controllers/reset-password-controller.js'
import { changePassword } from '../controllers/change-password-controller.js'

const router = Router()

router.post('/register', authLimiter, validate(registerSchema), registerUser)

router.post('/login', authLimiter, validate(loginSchema), loginUser)

router.post('/resend-otp', authLimiter, validate(resendOTPSchema), resendOTP)

router.post('/verify-email', authLimiter, validate(verifyEmailSchema), verifyEmail)

router.post('/forgot-password', authLimiter, validate(forgotPasswordSchema), forgotPassword)

router.post('/reset-password', authLimiter, validate(resetPasswordSchema), resetPassword)

router.post('/refresh-token', authLimiter, refreshToken)

router.post('/logout', authMiddleware, logoutUser)

router.post(
  '/change-password',
  authMiddleware,
  authLimiter,
  validate(changePasswordSchema),
  changePassword
)

router.get('/me', authMiddleware, getCurrentUser)

export default router
