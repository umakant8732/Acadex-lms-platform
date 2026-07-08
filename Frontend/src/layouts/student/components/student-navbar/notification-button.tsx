import React from 'react'
import { FiBell } from 'react-icons/fi'
import { showInfo } from '../../../../shared/utils/toast'

const NotificationButton: React.FC = () => {
  return (
    <button
      onClick={() => showInfo('Coming Soon: Notifications module is under development!')}
      className='
        relative
        text-2xl
        hover:opacity-60
        transition
      '
    >
      <FiBell />

      <span
        className='
          absolute
          -top-1
          -right-1
          w-2
          h-2
          bg-black
          rounded-full
        '
      />
    </button>
  )
}

export default NotificationButton
