// Keeps student library cache keys in one place.
export const studentLibraryQueryKeys = {
  root: ['student-course-library'] as const,
  courses: () => ['student-course-library', 'courses'] as const
}
