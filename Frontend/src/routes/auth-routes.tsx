import type { RouteObject } from 'react-router-dom'

import AuthLayout from '../layouts/auth/auth-layout'
import LoginPage from '../features/auth/pages/login-page/login-page'
import RegisterPage from '../features/auth/pages/register-page/register-page'
import ForgotPasswordPage from '../features/auth/pages/forgot-password-page/forgot-password-page'
import VerifyOtpPage from '../features/auth/pages/verify-otp-page/verify-otp-page'
import ResetPasswordPage from '../features/auth/pages/reset-password-page/reset-password-page'
import PreventAuthRoute from './prevent-auth-route'

const authRoutes = {
  path: '/auth',
  element: (
    <PreventAuthRoute>
      <AuthLayout />
    </PreventAuthRoute>
  ),
  children: [
    {
      index: true,
      element: <LoginPage />
    },
    {
      path: 'register',
      element: <RegisterPage />
    },
    {
      path: 'forgot-password',
      element: <ForgotPasswordPage />
    },
    {
      path: 'verify-otp',
      element: <VerifyOtpPage />
    },
    {
      path: 'reset-password',
      element: <ResetPasswordPage />
    }
  ]
} satisfies RouteObject


export default authRoutes

