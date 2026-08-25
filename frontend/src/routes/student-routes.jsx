/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import StudentLayout from "../layouts/student/student-layout";
import ProtectedRoute from "./protected-route";
import RoleRoute from "./role-route";
import LazyLoad from "@/shared/ui/feedback/lazy-load";

// Lazy-loaded student pages
const StudentHomePage = lazy(() =>
  import("../features/student/dashboard/pages/student-home-page")
);
const StudentCourseOverviewPage = lazy(() =>
  import(
    "../features/student/courses/overview/pages/student-course-overview-page/student-course-overview-page"
  )
);
const StudentWatchPage = lazy(() =>
  import(
    "../features/student/lectures/watch/pages/student-watch-page/student-watch-page"
  )
);
const CoursePreviewPage = lazy(() =>
  import(
    "../features/common/course-preview/pages/course-preview-page/course-preview-page"
  )
);
const StudentMyLearningPage = lazy(() =>
  import(
    "../features/student/courses/my-learning/pages/student-my-learning-page"
  )
);
const StudentWishlistPage = lazy(() =>
  import("../features/student/dashboard/pages/student-wishlist-page")
);
const StudentInvoicesPage = lazy(() =>
  import("../features/student/courses/checkout/pages/student-invoices-page")
);

const studentRoutes = {
  path: "/student",
  element: (
    <ProtectedRoute>
      <RoleRoute allowedRole="student">
        <StudentLayout />
      </RoleRoute>
    </ProtectedRoute>
  ),
  children: [
    {
      index: true,
      element: (
        <LazyLoad subtitle="Loading student dashboard...">
          <StudentHomePage />
        </LazyLoad>
      ),
    },
    {
      path: "courses/:courseId",
      element: (
        <LazyLoad subtitle="Loading course overview...">
          <StudentCourseOverviewPage />
        </LazyLoad>
      ),
    },
    {
      path: "courses/:courseId/learn",
      element: (
        <LazyLoad subtitle="Loading lecture player...">
          <StudentWatchPage />
        </LazyLoad>
      ),
    },
    {
      path: "courses/:courseId/learn/:lessonId",
      element: (
        <LazyLoad subtitle="Loading lecture player...">
          <StudentWatchPage />
        </LazyLoad>
      ),
    },
    {
      path: "checkout/:courseId",
      element: (
        <LazyLoad subtitle="Loading checkout...">
          <CoursePreviewPage />
        </LazyLoad>
      ),
    },
    {
      path: "my-learning",
      element: (
        <LazyLoad subtitle="Loading enrolled courses...">
          <StudentMyLearningPage />
        </LazyLoad>
      ),
    },
    {
      path: "wishlist",
      element: (
        <LazyLoad subtitle="Loading wishlist...">
          <StudentWishlistPage />
        </LazyLoad>
      ),
    },
    {
      path: "invoices",
      element: (
        <LazyLoad subtitle="Loading invoices...">
          <StudentInvoicesPage />
        </LazyLoad>
      ),
    },
  ],
};

export default studentRoutes;
