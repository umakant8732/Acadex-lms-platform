import { useEffect, useMemo, useState } from 'react'

import {
  COURSE_SEARCH_DEBOUNCE_MS,
  DEFAULT_COURSE_LIMIT,
  DEFAULT_COURSE_PAGE
} from '../constants/course-pagination.js'

export const useManageCourseFilters = () => {
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

  const handleSearchChange = value => {
    setSearchInput(value)
  }

  const handleCategoryChange = value => {
    setCategory(value)
    setPage(DEFAULT_COURSE_PAGE)
  }

  const handlePageChange = nextPage => {
    setPage(nextPage)
  }

  const handleLimitChange = nextLimit => {
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
