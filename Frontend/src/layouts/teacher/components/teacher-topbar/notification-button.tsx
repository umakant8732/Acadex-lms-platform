import React from 'react'
import { HiOutlineBell } from 'react-icons/hi2'

const NotificationButton: React.FC = () => {
  return (
    <button
      className='
        w-11
        h-11
        border
        border-black/10
        flex
        items-center
        justify-center
        hover:bg-black
        hover:text-white
        transition
      '
    >
      <HiOutlineBell className='text-xl' />
    </button>
  )
}

export default NotificationButton
