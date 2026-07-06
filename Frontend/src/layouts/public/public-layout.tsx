import { Outlet } from 'react-router-dom'

import PublicFooter from './components/public-footer.jsx'
import PublicNavbar from './components/public-navbar.jsx'

const PublicLayout = () => {
  return (
    <div className='min-h-screen bg-white text-black'>
      {/* Public shell keeps landing and preview pages in one frame. */}
      <PublicNavbar />

      <main>
        <Outlet />
      </main>

      <PublicFooter />
    </div>
  )
}

export default PublicLayout
