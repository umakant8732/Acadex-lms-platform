import StudentLayout from '../layouts/student/student-layout.jsx'

import CoursePreviewPage from '../features/course/preview/pages/course-preview-page/course-preview-page.jsx'
import StudentCourseOverviewPage from '../features/course/student-overview/pages/student-course-overview-page/student-course-overview-page.jsx'
import StudentWatchPage from '../features/lecture/student-watch/pages/student-watch-page/student-watch-page.jsx'
import StudentHomePage from '../layouts/student/pages/home-page/home-page.jsx'
import ProtectedRoute from './protected-route'
import RoleRoute from './role-route'

const studentRoutes = {
  path: '/student',
  element: (
    <ProtectedRoute>
      <RoleRoute allowedRole='student'>
        <StudentLayout />
      </RoleRoute>
    </ProtectedRoute>
  ),
  children: [
    {
      index: true,
      element: <StudentHomePage />
    },

    {
      path: 'courses/:courseId',
      element: <StudentCourseOverviewPage />
    },

    {
      path: 'courses/:courseId/learn',
      element: <StudentWatchPage />
    },

    {
      path: 'courses/:courseId/learn/:lessonId',
      element: <StudentWatchPage />
    },

    {
      path: 'checkout/:courseId',
      element: <CoursePreviewPage />
    }
  ]
}

export default studentRoutes
