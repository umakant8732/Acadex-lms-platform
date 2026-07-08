import React from 'react'
import { NavLink } from 'react-router-dom'
import { HiOutlineXMark } from 'react-icons/hi2'
import { showInfo } from '../../../shared/utils/toast.js'

import {
  HiOutlineBookOpen,
  HiOutlineCamera,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCog6Tooth,
  HiOutlineSquares2X2,
  HiOutlineUsers
} from 'react-icons/hi2'

import AppLogo from '../../../shared/ui/app-shell/app-logo.js'

export interface MenuItem {
  name: string
  icon: React.ReactNode
  path: string
  disabled?: boolean
}

const menus: MenuItem[] = [
  {
    name: 'Dashboard',
    icon: <HiOutlineSquares2X2 />,
    path: '/teacher'
  },
  {
    name: 'Courses',
    icon: <HiOutlineBookOpen />,
    path: '/teacher/courses'
  },
  {
    name: 'Lectures',
    icon: <HiOutlineCamera />,
    path: '/teacher/lectures'
  },
  {
    name: 'Students',
    icon: <HiOutlineUsers />,
    path: '/teacher/students',
    disabled: true
  },
  {
    name: 'Messages',
    icon: <HiOutlineChatBubbleLeftRight />,
    path: '/teacher/messages',
    disabled: true
  },
  {
    name: 'Settings',
    icon: <HiOutlineCog6Tooth />,
    path: '/teacher/settings',
    disabled: true
  }
]

export interface TeacherSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

const TeacherSidebar: React.FC<TeacherSidebarProps> = ({
  isOpen = false,
  onClose
}) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 flex-col border-r border-black/5 bg-white px-5 py-6 transition-transform duration-200 lg:sticky lg:top-0 lg:w-65 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className='flex items-center justify-between gap-4'>
        <AppLogo to='/teacher' />

        <button
          type='button'
          onClick={onClose}
          className='flex h-10 w-10 items-center justify-center border border-black/10 text-xl transition hover:bg-black hover:text-white lg:hidden'
          aria-label='Close sidebar'
        >
          <HiOutlineXMark />
        </button>
      </div>

      <div className='mt-10 flex flex-1 flex-col gap-2 overflow-y-auto pr-1'>
        {menus.map(menu => {
          if (menu.disabled) {
            return (
              <button
                key={menu.name}
                onClick={() => {
                  showInfo(`Coming Soon: ${menu.name} module is under development!`)
                  if (onClose) onClose()
                }}
                className='
                  h-12
                  px-4
                  flex
                  w-full
                  items-center
                  gap-3
                  text-sm
                  font-medium
                  transition
                  border
                  border-transparent
                  bg-white
                  hover:border-black/10
                  text-black/50
                '
              >
                <span className='text-lg'>{menu.icon}</span>
                {menu.name}
              </button>
            )
          }

          return (
            <NavLink
              key={menu.name}
              to={menu.path}
              onClick={onClose}
              className={({ isActive }) =>
                `
                  h-12
                  px-4
                  flex
                  items-center
                  gap-3
                  text-sm
                  font-medium
                  transition
                  border
                  ${
                    isActive
                      ? 'border-black bg-black text-white'
                      : 'border-transparent bg-white hover:border-black/10'
                  }
                `
              }
            >
              <span className='text-lg'>{menu.icon}</span>
              {menu.name}
            </NavLink>
          )
        })}
      </div>
    </aside>
  )
}

export default TeacherSidebar
