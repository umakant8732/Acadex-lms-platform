/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import PublicLayout from "../layouts/public/public-layout.jsx";
import HomePage from "../layouts/public/pages/home-page/home-page";
import LazyLoad from "@/shared/ui/feedback/lazy-load";

// Lazy-loaded subpages
const CoursePreviewPage = lazy(() =>
  import("../features/common/course-preview/pages/course-preview-page/course-preview-page")
);
const TermsOfServicePage = lazy(() =>
  import("../features/common/legal/pages/terms-of-service-page")
);
const PrivacyPolicyPage = lazy(() =>
  import("../features/common/legal/pages/privacy-policy-page")
);
const RefundPolicyPage = lazy(() =>
  import("../features/common/legal/pages/refund-policy-page")
);
const ContactUsPage = lazy(() =>
  import("../features/common/legal/pages/contact-us-page")
);

const publicRoutes = {
  path: "/",
  element: <PublicLayout />,
  children: [
    {
      index: true,
      // HomePage is eagerly loaded for instant 0ms first paint on root landing page
      element: <HomePage />,
    },
    {
      path: "course-details-page/:courseId",
      element: (
        <LazyLoad subtitle="Loading course details...">
          <CoursePreviewPage />
        </LazyLoad>
      ),
    },
    {
      path: "terms-of-service",
      element: (
        <LazyLoad>
          <TermsOfServicePage />
        </LazyLoad>
      ),
    },
    {
      path: "privacy-policy",
      element: (
        <LazyLoad>
          <PrivacyPolicyPage />
        </LazyLoad>
      ),
    },
    {
      path: "refund-policy",
      element: (
        <LazyLoad>
          <RefundPolicyPage />
        </LazyLoad>
      ),
    },
    {
      path: "contact-us",
      element: (
        <LazyLoad>
          <ContactUsPage />
        </LazyLoad>
      ),
    },
  ],
};

export default publicRoutes;
