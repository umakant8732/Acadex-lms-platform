export const lectureQueryKeys = {
  manageCourses: ['lecture-manage-courses'] as const,
  courseCurriculum: (courseId?: string) => ['lecture-course-curriculum', courseId] as const
}
