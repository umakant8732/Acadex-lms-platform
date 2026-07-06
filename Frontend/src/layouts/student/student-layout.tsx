import { Outlet } from 'react-router-dom'

import ShellContainer from '../../shared/ui/app-shell/shell-container.jsx'
import StudentFooter from './components/student-footer.jsx'
import StudentNavbar from './components/student-navbar.jsx'

const StudentLayout = () => {
  return (
    <div className='min-h-screen bg-[#f5f5f5] text-black'>
      {/* Student shell shares same top navigation across library pages. */}
      <StudentNavbar />

      <main className='pb-10 pt-0'>
        <ShellContainer className='px-4 sm:px-6'>
          <Outlet />
        </ShellContainer>
      </main>

      <StudentFooter />
    </div>
  )
}

export default StudentLayout
