import { buildCourseThumbnailUrl } from './build-course-thumbnail-url.js'

// Shapes one course for student overview page.
export const mapStudentCourseOverview = (course, access) => {
  return {
    _id: course._id,
    title: course.title,
    subtitle: course.subtitle,
    description: course.description,
    category: course.category,
    level: course.level,
    price: course.price,
    originalPrice: course.originalPrice,
    duration: course.duration,
    lectures: course.lectures,
    projects: course.projects,
    thumbnail: buildCourseThumbnailUrl(course.thumbnailKey),
    instructorName: course.instructorName,
    syllabus: course.syllabus ?? [],
    access
  }
}
