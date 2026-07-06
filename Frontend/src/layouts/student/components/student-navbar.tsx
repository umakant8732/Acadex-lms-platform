import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiBars3BottomRight, HiXMark } from 'react-icons/hi2'

import AppLogo from '../../../shared/ui/app-shell/app-logo.js'
import TopbarShell from '../../../shared/ui/app-shell/topbar-shell.js'
import NavLinks from './student-navbar/nav-links.js'
import NotificationButton from './student-navbar/notification-button.js'
import ProfileDropdown from './student-navbar/profile-dropdown.js'

const StudentNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <TopbarShell containerClassName='flex h-16 items-center justify-between gap-4 sm:h-20'>
      <AppLogo to='/student' className='text-2xl sm:text-3xl' />

      <NavLinks />

      <div className='flex items-center gap-3 sm:gap-4'>
        <NotificationButton />
        <ProfileDropdown />

        <button
          type='button'
          onClick={() => setMobileMenuOpen(prev => !prev)}
          className='flex h-10 w-10 items-center justify-center border border-black/10 text-xl transition hover:bg-black hover:text-white lg:hidden'
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <HiXMark /> : <HiBars3BottomRight />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            className='absolute inset-x-0 top-full border-b border-black/5 bg-white px-6 py-5 shadow-sm lg:hidden'
          >
            <NavLinks mobile />
          </motion.div>
        )}
      </AnimatePresence>
    </TopbarShell>
  )
}

export default StudentNavbar
