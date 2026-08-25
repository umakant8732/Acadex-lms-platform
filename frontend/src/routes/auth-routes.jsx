/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import AuthLayout from "../layouts/auth/auth-layout";
import PreventAuthRoute from "./prevent-auth-route";
import LazyLoad from "@/shared/ui/feedback/lazy-load";

// Lazy-loaded auth pages
const LoginPage = lazy(() => import("../features/auth/pages/login-page/login-page"));
const RegisterPage = lazy(() => import("../features/auth/pages/register-page/register-page"));
const ForgotPasswordPage = lazy(() =>
  import("../features/auth/pages/forgot-password-page/forgot-password-page")
);
const VerifyOtpPage = lazy(() => import("../features/auth/pages/verify-otp-page/verify-otp-page"));
const ResetPasswordPage = lazy(() =>
  import("../features/auth/pages/reset-password-page/reset-password-page")
);

const authRoutes = {
  path: "/auth",
  element: (
    <PreventAuthRoute>
      <AuthLayout />
    </PreventAuthRoute>
  ),
  children: [
    {
      index: true,
      element: (
        <LazyLoad subtitle="Loading login...">
          <LoginPage />
        </LazyLoad>
      ),
    },
    {
      path: "register",
      element: (
        <LazyLoad subtitle="Loading registration...">
          <RegisterPage />
        </LazyLoad>
      ),
    },
    {
      path: "forgot-password",
      element: (
        <LazyLoad subtitle="Loading password recovery...">
          <ForgotPasswordPage />
        </LazyLoad>
      ),
    },
    {
      path: "verify-otp",
      element: (
        <LazyLoad subtitle="Loading OTP verification...">
          <VerifyOtpPage />
        </LazyLoad>
      ),
    },
    {
      path: "reset-password",
      element: (
        <LazyLoad subtitle="Loading reset password...">
          <ResetPasswordPage />
        </LazyLoad>
      ),
    },
  ],
};

export default authRoutes;
