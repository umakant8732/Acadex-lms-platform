import PublicLayout from '../layouts/public/public-layout.jsx'

import HomePage from '../layouts/public/pages/home-page/home-page.jsx'
import CoursePreviewPage from '../features/course/preview/pages/course-preview-page/course-preview-page.jsx'

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
}

export default publicRoutes
