import React, { useState } from 'react'
import { FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { useAuthLogout } from '../../../../features/auth/hooks/use-auth-logout'
import DropdownPanel from '../../../../shared/ui/app-shell/dropdown-panel.js'

const menuItemClasses = `
  block
  w-full
  px-4
  py-3
  text-left
  text-sm
  transition
  hover:bg-black
  hover:text-white
`

const ProfileDropdown: React.FC = () => {
  const [open, setOpen] = useState(false)

  const {
    handleLogout,
    isPending
  } = useAuthLogout()

  return (
    <div className='relative'>
      <button
        onClick={() => setOpen(prev => !prev)}
        className='w-10 h-10 border border-black/10 flex items-center justify-center text-xl transition hover:bg-black hover:text-white'
      >
        <FiUser />
      </button>

      {open && (
        <DropdownPanel>
          <Link to='/student' className={menuItemClasses}>
            My Courses
          </Link>

          <button
            onClick={handleLogout}
            disabled={isPending}
            className={menuItemClasses}
          >
            Logout
          </button>
        </DropdownPanel>
      )}
    </div>
  )
}

export default ProfileDropdown
