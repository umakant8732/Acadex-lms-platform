import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'

const SearchBox = () => {
  return (
    <div className='flex h-10 w-full max-w-xl items-center gap-3 border border-black/10 bg-[#fafafa] px-3 sm:h-11 sm:px-4'>
      <HiOutlineMagnifyingGlass className='text-lg text-black/40 sm:text-xl' />

      <input
        type='text'
        placeholder='Search courses...'
        className='w-full bg-transparent text-sm outline-none'
      />
    </div>
  )
}

export default SearchBox
