import TeacherLayout from '../layouts/teacher/teacher-layout.jsx'
import ProtectedRoute from './protected-route'
import RoleRoute from './role-route'

//manage course pages
import DashboardPage from '../layouts/teacher/pages/dashboard-page/dashboard-page.jsx'
import CreateCoursePage from '../features/course/teacher-manage/pages/create-course-page/create-course-page.jsx'
import ManageCoursesPage from '../features/course/teacher-manage/pages/manage-courses-page/manage-course-page.jsx'
import UpdateCoursePage from '../features/course/teacher-manage/pages/update-course-page/update-course-page.jsx'
import ViewCoursePage from '../features/course/teacher-manage/pages/view-course-page/view-course-page.jsx'


//manage lecture pages
import ManageLecturesPage from '../features/lecture/teacher-manage/pages/manage-lectures-page/manage-lectures-page.jsx'
import CourseCurriculumPage from '../features/lecture/teacher-manage/pages/course-curriculum-page/course-curriculum-page.jsx'



const teacherRoutes = {
  path: '/teacher',
  element: (
    <ProtectedRoute>
      <RoleRoute allowedRole='teacher'>
        <TeacherLayout />
      </RoleRoute>
    </ProtectedRoute>
  ),
  children: [
    {
      index: true,
      element: <DashboardPage />
    },

    {
      path: 'courses',
      element: <ManageCoursesPage />
    },

    {
      path: 'create-course',
      element: <CreateCoursePage />
    },

    {
      path: 'update-course/:courseId',
      element: <UpdateCoursePage />
    },

    {
      path: 'view-course/:courseId',
      element: <ViewCoursePage />
    },

    {
      path: 'lectures',
      element: <ManageLecturesPage />
    },

    {
      path : 'lectures/:courseId',
      element : <CourseCurriculumPage />
    }

  ]
}

export default teacherRoutes
