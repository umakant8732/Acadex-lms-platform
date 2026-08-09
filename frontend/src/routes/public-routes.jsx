import PublicLayout from "../layouts/public/public-layout.jsx";
import HomePage from "../layouts/public/pages/home-page/home-page";
import CoursePreviewPage from "../features/common/course-preview/pages/course-preview-page/course-preview-page";

// Legal & Compliance Pages
import TermsOfServicePage from "../features/common/legal/pages/terms-of-service-page";
import PrivacyPolicyPage from "../features/common/legal/pages/privacy-policy-page";
import RefundPolicyPage from "../features/common/legal/pages/refund-policy-page";
import ContactUsPage from "../features/common/legal/pages/contact-us-page";

const publicRoutes = {
  path: "/",
  element: <PublicLayout />,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: "course-details-page/:courseId",
      element: <CoursePreviewPage />,
    },
    {
      path: "terms-of-service",
      element: <TermsOfServicePage />,
    },
    {
      path: "privacy-policy",
      element: <PrivacyPolicyPage />,
    },
    {
      path: "refund-policy",
      element: <RefundPolicyPage />,
    },
    {
      path: "contact-us",
      element: <ContactUsPage />,
    },
  ],
};

export default publicRoutes;
