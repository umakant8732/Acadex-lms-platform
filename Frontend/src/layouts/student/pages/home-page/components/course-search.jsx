import { FiSearch } from 'react-icons/fi'

const CourseSearch = ({
  value,
  onChange
}) => {
  return (
    <div className='relative'>
      <FiSearch
        className='
          absolute
          left-5
          top-1/2
          -translate-y-1/2
          text-black/40
          text-lg
        '
      />

      <input
        type='text'
        value={value}
        onChange={onChange}
        placeholder='Search by course title'
        className='
          w-full
          h-14
          bg-white
          border
          border-black/10
          outline-none
          px-14
          text-sm
          placeholder:text-black/40
          focus:border-black
          transition
        '
      />
    </div>
  )
}

export default CourseSearch
