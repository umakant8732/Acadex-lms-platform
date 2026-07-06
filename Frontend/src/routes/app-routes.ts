import { createBrowserRouter, type RouteObject } from 'react-router-dom'

import authRoutes from './auth-routes'
import publicRoutes from './public-routes'
import studentRoutes from './student-routes'
import teacherRoutes from './teacher-routes'

const routes: RouteObject[] = [
  publicRoutes,
  authRoutes,
  studentRoutes,
  teacherRoutes
]

const router = createBrowserRouter(routes)

export default router
