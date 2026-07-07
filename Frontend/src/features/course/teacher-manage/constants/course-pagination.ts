// Default pagination values used by manage course filters and table.
export const DEFAULT_COURSE_PAGE = 1
export const DEFAULT_COURSE_LIMIT = 10

// Delay search request so typing does not hit backend on every key press.
export const COURSE_SEARCH_DEBOUNCE_MS = 400

// Page size options shown in manage course pagination control.
export const COURSE_PAGE_LIMIT_OPTIONS = [5, 10, 20, 50] as const
