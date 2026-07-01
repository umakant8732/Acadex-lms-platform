import mongoose from 'mongoose'

import ApiError from '../../../../utils/api-error.js'
import { buildCourseThumbnailUrl } from '../../../course/helpers/build-course-thumbnail-url.js'
import { findCourseCurriculumById } from '../../repositories/find-course-curriculum-repository.js'
import { findLectureByCourse } from '../../repositories/find-lectures-by-course-repository.js'

//build course curriculum data for the teacher lecture management screen.
export const getCourseCurriculumService = async courseId => {
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, 'Invalid course id')
  }

  const course = await findCourseCurriculumById(courseId)

  if (!course) {
    throw new ApiError(404, 'Course not found')
  }

  const lectures = await findLectureByCourse(courseId)

  //make lectures lookup fast by storing each lecture against its lessonId
  const lectureByLessonId = new Map(
    lectures.map(lecture => [String(lecture.lessonId), lecture])
  )

  const sections = (course.syllabus ?? []).map(section => ({
    _id: section._id,
    sectionTitle: section.sectionTitle,
    order: section.order,

    lessons: (section.lessons ?? []).map(lesson => {
      const lecture = lectureByLessonId.get(String(lesson._id))

      return {
        _id: lesson._id,
        title: lesson.title,
        order: lesson.order,

        //null means this lesson does not have a video uploaded yet
        lecture: lecture
          ? {
              _id: lecture._id,
              status: lecture.status,
              isPreview: lecture.isPreview,
              videoAssetId: lecture.videoAssetId
            }
          : null
      }
    })
  }))

  return {
    course: {
      _id: course._id,
      title: course.title,
      subtitle: course.subtitle,
      category: course.category,
      level: course.level,
      thumbnail: buildCourseThumbnailUrl(course.thumbnailKey),
      isPublished: course.isPublished
    },
    sections
  }
}
