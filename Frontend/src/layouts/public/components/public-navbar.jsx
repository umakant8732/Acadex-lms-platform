import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import AppLogo from '../../../shared/ui/app-shell/app-logo.jsx'
import TopbarShell from '../../../shared/ui/app-shell/topbar-shell.jsx'

const PublicNavbar = () => {
  return (
    <TopbarShell
      as={motion.nav}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      containerClassName='flex h-16 items-center justify-between gap-4 sm:h-20'
    >
      <AppLogo to='/' className='text-2xl sm:text-3xl' />

      <Link
        to='/auth'
        className='inline-flex h-10 items-center justify-center border border-black bg-black px-4 text-sm font-medium text-white transition hover:opacity-90 sm:h-11 sm:px-5'
      >
        Get Started
      </Link>
    </TopbarShell>
  )
}

export default PublicNavbar
