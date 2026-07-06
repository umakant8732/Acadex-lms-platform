import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import TeacherSidebar from './components/teacher-sidebar.jsx'
import TeacherTopbar from './components/teacher-topbar.jsx'

const TeacherLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const openSidebar = () => setIsSidebarOpen(true)
  const closeSidebar = () => setIsSidebarOpen(false)

  return (
    <div className='min-h-screen bg-[#f5f5f5] lg:flex'>
      <TeacherSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {isSidebarOpen && (
        <button
          type='button'
          aria-label='Close sidebar overlay'
          onClick={closeSidebar}
          className='fixed inset-0 z-40 bg-black/40 lg:hidden'
        />
      )}

      <div className='flex min-h-screen flex-1 flex-col min-w-0'>
        {/* Topbar only opens sidebar; close is controlled by sidebar and overlay. */}
        <TeacherTopbar onMenuToggle={openSidebar} />

        <main className='p-4 sm:p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default TeacherLayout
