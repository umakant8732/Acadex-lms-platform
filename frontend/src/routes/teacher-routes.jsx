/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import TeacherLayout from "../layouts/teacher/teacher-layout.jsx";
import ProtectedRoute from "./protected-route";
import RoleRoute from "./role-route";
import LazyLoad from "@/shared/ui/feedback/lazy-load";

// Lazy-loaded teacher pages
const DashboardPage = lazy(() =>
  import("../features/teacher/dashboard/pages/dashboard-page.jsx")
);
const ManageCoursesPage = lazy(() =>
  import(
    "../features/teacher/courses/manage/pages/manage-courses-page/manage-course-page.jsx"
  )
);
const CreateCoursePage = lazy(() =>
  import(
    "../features/teacher/courses/manage/pages/create-course-page/create-course-page.jsx"
  )
);
const UpdateCoursePage = lazy(() =>
  import(
    "../features/teacher/courses/manage/pages/update-course-page/update-course-page.jsx"
  )
);
const ViewCoursePage = lazy(() =>
  import(
    "../features/teacher/courses/manage/pages/view-course-page/view-course-page.jsx"
  )
);
const ManageLecturesPage = lazy(() =>
  import(
    "../features/teacher/lectures/manage/pages/manage-lectures-page/manage-lectures-page.jsx"
  )
);
const CourseCurriculumPage = lazy(() =>
  import(
    "../features/teacher/lectures/manage/pages/course-curriculum-page/course-curriculum-page.jsx"
  )
);

const teacherRoutes = {
  path: "/teacher",
  element: (
    <ProtectedRoute>
      <RoleRoute allowedRole="teacher">
        <TeacherLayout />
      </RoleRoute>
    </ProtectedRoute>
  ),
  children: [
    {
      index: true,
      element: (
        <LazyLoad subtitle="Loading teacher dashboard...">
          <DashboardPage />
        </LazyLoad>
      ),
    },
    {
      path: "courses",
      element: (
        <LazyLoad subtitle="Loading course manager...">
          <ManageCoursesPage />
        </LazyLoad>
      ),
    },
    {
      path: "create-course",
      element: (
        <LazyLoad subtitle="Loading course builder...">
          <CreateCoursePage />
        </LazyLoad>
      ),
    },
    {
      path: "update-course/:courseId",
      element: (
        <LazyLoad subtitle="Loading course editor...">
          <UpdateCoursePage />
        </LazyLoad>
      ),
    },
    {
      path: "view-course/:courseId",
      element: (
        <LazyLoad subtitle="Loading course view...">
          <ViewCoursePage />
        </LazyLoad>
      ),
    },
    {
      path: "lectures",
      element: (
        <LazyLoad subtitle="Loading lecture manager...">
          <ManageLecturesPage />
        </LazyLoad>
      ),
    },
    {
      path: "lectures/:courseId",
      element: (
        <LazyLoad subtitle="Loading course curriculum...">
          <CourseCurriculumPage />
        </LazyLoad>
      ),
    },
  ],
};

export default teacherRoutes;
