import type { RouteObject } from 'react-router-dom'

import PublicLayout from '../layouts/public/public-layout.jsx'
import HomePage from '../layouts/public/pages/home-page/home-page'
import CoursePreviewPage from '../features/course/preview/pages/course-preview-page/course-preview-page'

const publicRoutes = {
  path: '/',
  element: <PublicLayout />,
  children: [
    {
      index: true,
      element: <HomePage />
    },
    {
      path: 'course-details-page/:courseId',
      element: <CoursePreviewPage />
    }
  ]
} satisfies RouteObject

export default publicRoutes


