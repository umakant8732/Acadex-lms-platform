import { useEffect, useMemo, useState } from 'react'

import {
  COURSE_SEARCH_DEBOUNCE_MS,
  DEFAULT_COURSE_LIMIT,
  DEFAULT_COURSE_PAGE
} from '../constants/course-pagination.js'
import type { ManageCoursesFilters } from '../types/teacher-course-types'

export interface ManageCourseFiltersState {
  page: number
  limit: number
  searchInput: string
  search: string
  category: string
  queryParams: ManageCoursesFilters
  hasActiveFilters: boolean

  handleSearchChange: (value: string) => void
  handleCategoryChange: (value: string) => void
  handlePageChange: (nextPage: number) => void
  handleLimitChange: (nextLimit: number | string) => void
  resetFilters: () => void
}

export const useManageCourseFilters = (): ManageCourseFiltersState => {
  const [page, setPage] = useState(DEFAULT_COURSE_PAGE)
  const [limit, setLimit] = useState(DEFAULT_COURSE_LIMIT)
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(searchInput.trim())
      setPage(DEFAULT_COURSE_PAGE)
    }, COURSE_SEARCH_DEBOUNCE_MS)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [searchInput])

  const handleSearchChange = (value: string) => {
    setSearchInput(value)
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    setPage(DEFAULT_COURSE_PAGE)
  }

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage)
  }

  const handleLimitChange = (nextLimit: number | string) => {
    setLimit(Number(nextLimit))
    setPage(DEFAULT_COURSE_PAGE)
  }

  const resetFilters = () => {
    setPage(DEFAULT_COURSE_PAGE)
    setLimit(DEFAULT_COURSE_LIMIT)
    setSearchInput('')
    setDebouncedSearch('')
    setCategory('')
  }

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      search: debouncedSearch,
      category
    }),
    [page, limit, debouncedSearch, category]
  )

  const hasActiveFilters = Boolean(searchInput || debouncedSearch || category)

  return {
    page,
    limit,
    searchInput,
    search: debouncedSearch,
    category,
    queryParams,
    hasActiveFilters,

    handleSearchChange,
    handleCategoryChange,
    handlePageChange,
    handleLimitChange,

    resetFilters
  }
}
