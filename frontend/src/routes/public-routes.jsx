/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import PublicLayout from "../layouts/public/public-layout.jsx";
import LazyLoad from "@/shared/ui/feedback/lazy-load";

// Lazy-loaded public pages
const HomePage = lazy(() => import("../layouts/public/pages/home-page/home-page"));
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
      element: (
        <LazyLoad subtitle="Loading published courses...">
          <HomePage />
        </LazyLoad>
      ),
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
