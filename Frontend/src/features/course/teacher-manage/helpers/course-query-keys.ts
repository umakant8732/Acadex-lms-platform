export const courseQueryKeys = {
  manageCoursesRoot: ['manage-courses'] as const,
  manageCourses: (params: any) => ['manage-courses', params] as const,
  courseDetails: (courseId?: string) => ['course-details', courseId] as const
}
