// Keeps student watch query keys in one place.
// This helps reuse same key in query and invalidation.
export const studentWatchQueryKeys = {
  root: ['student-watch'] as const,
  courseCurriculum: (courseId: string) =>
    ['student-watch', 'course-curriculum', courseId] as const
}
