import StudentLayout from "../layouts/student/student-layout";
import CoursePreviewPage from "../features/common/course-preview/pages/course-preview-page/course-preview-page";
import StudentCourseOverviewPage from "../features/student/courses/overview/pages/student-course-overview-page/student-course-overview-page";
import StudentWatchPage from "../features/student/lectures/watch/pages/student-watch-page/student-watch-page";
import StudentHomePage from "../features/student/dashboard/pages/student-home-page";
import StudentInvoicesPage from "../features/student/courses/checkout/pages/student-invoices-page";
import StudentMyLearningPage from "../features/student/courses/my-learning/pages/student-my-learning-page";
import ProtectedRoute from "./protected-route";
import RoleRoute from "./role-route";

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
      element: <StudentHomePage />,
    },
    {
      path: "courses/:courseId",
      element: <StudentCourseOverviewPage />,
    },
    {
      path: "courses/:courseId/learn",
      element: <StudentWatchPage />,
    },
    {
      path: "courses/:courseId/learn/:lessonId",
      element: <StudentWatchPage />,
    },
    {
      path: "checkout/:courseId",
      element: <CoursePreviewPage />,
    },
    {
      path: "my-learning",
      element: <StudentMyLearningPage />,
    },
    {
      path: "invoices",
      element: <StudentInvoicesPage />,
    },
  ],
};

export default studentRoutes;
