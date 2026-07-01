import { FiBell } from 'react-icons/fi'

const NotificationButton = () => {
  return (
    <button
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
