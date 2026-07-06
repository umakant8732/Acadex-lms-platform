import React from 'react'
import ReactPaginateModule from 'react-paginate'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

// Handle default/commonjs exports of react-paginate cleanly
const ReactPaginate = (ReactPaginateModule as any).default || ReactPaginateModule

export interface AppPaginationProps {
  page: number
  totalPages: number
  onPageChange: (selectedPage: number) => void
  pageRangeDisplayed?: number
  marginPagesDisplayed?: number
  className?: string
}

const AppPagination: React.FC<AppPaginationProps> = ({
  page,
  totalPages,
  onPageChange,
  pageRangeDisplayed = 3,
  marginPagesDisplayed = 1,
  className = ''
}) => {
  if (!totalPages || totalPages <= 1) {
    return null
  }

  const handlePageChange = ({ selected }: { selected: number }) => {
    onPageChange(selected + 1)
  }

  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={Math.max(page - 1, 0)}
      onPageChange={handlePageChange}
      previousLabel={<FiChevronLeft size={16} />}
      nextLabel={<FiChevronRight size={16} />}
      breakLabel='...'
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={marginPagesDisplayed}
      renderOnZeroPageCount={null}
      containerClassName={`flex flex-wrap items-center gap-2 ${className}`}
      pageLinkClassName='flex h-10 min-w-10 items-center justify-center border border-black/10 px-3 text-sm font-medium text-black/70 transition hover:bg-black hover:text-white'
      activeLinkClassName='border-black bg-black text-white'
      previousLinkClassName='flex h-10 w-10 items-center justify-center border border-black/10 text-black/70 transition hover:bg-black hover:text-white'
      nextLinkClassName='flex h-10 w-10 items-center justify-center border border-black/10 text-black/70 transition hover:bg-black hover:text-white'
      disabledLinkClassName='cursor-not-allowed opacity-40 hover:bg-white hover:text-black/70'
      breakLinkClassName='flex h-10 min-w-10 items-center justify-center border border-black/10 px-3 text-sm text-black/50'
    />
  )
}

export default AppPagination
