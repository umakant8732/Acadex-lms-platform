import { HiBars3BottomRight } from 'react-icons/hi2'

import NotificationButton from './teacher-topbar/notification-button.jsx'
import SearchBox from './teacher-topbar/search-box.jsx'
import TeacherProfileDropdown from './teacher-topbar/teacher-profile-dropdown.jsx'

function TeacherTopbar({ onMenuToggle }) {
  return (
    <header className='sticky top-0 z-30 border-b border-black/5 bg-white px-4 sm:px-6'>
      <div className='flex h-16 items-center justify-between gap-3 sm:h-20 sm:gap-5'>
        <div className='flex min-w-0 flex-1 items-center gap-3 sm:gap-4'>
          <button
            type='button'
            onClick={onMenuToggle}
            className='flex h-10 w-10 shrink-0 items-center justify-center border border-black/10 text-xl transition hover:bg-black hover:text-white lg:hidden'
            aria-label='Open sidebar'
          >
            <HiBars3BottomRight />
          </button>

          <SearchBox />
        </div>

        <div className='flex shrink-0 items-center gap-3 sm:gap-5'>
          <NotificationButton />
          <TeacherProfileDropdown />
        </div>
      </div>
    </header>
  )
}

export default TeacherTopbar
