import type { RouteObject } from 'react-router-dom'

import StudentLayout from '../layouts/student/student-layout'
import CoursePreviewPage from '../features/course/preview/pages/course-preview-page/course-preview-page'
import StudentCourseOverviewPage from '../features/course/student-overview/pages/student-course-overview-page/student-course-overview-page'
import StudentWatchPage from '../features/lecture/student-watch/pages/student-watch-page/student-watch-page'
import StudentHomePage from '../layouts/student/pages/home-page/home-page'
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
} satisfies RouteObject

export default studentRoutes






