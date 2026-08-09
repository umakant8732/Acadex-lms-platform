import { buildCourseThumbnailUrl } from './build-course-thumbnail-url.js'

// Shapes one course item for student library cards.
export const mapStudentCourseCard = (course, access, preview) => {
  return {
    _id: course._id,
    title: course.title,
    subtitle: course.subtitle,
    description: course.description,
    category: course.category,
    level: course.level,
    price: course.price,
    originalPrice: course.originalPrice,
    thumbnail: buildCourseThumbnailUrl(course.thumbnailKey),
    instructorName: course.instructorName,
    syllabus: course.syllabus ?? [],
    access,
    preview
  }
}
