import { Outlet } from 'react-router-dom'

import AuthBanner from '../../features/auth/components/auth-banner'

const AuthLayout = () => {
  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* Left side keeps auth brand message visible on large screens. */}
      <AuthBanner />

      {/* Right side holds current auth page content. */}
      <div className='flex items-center justify-center px-6 py-10 bg-white'>
        <div className='w-full max-w-md'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout

