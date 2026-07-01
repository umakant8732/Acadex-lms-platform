import Course from '../../course/models/course-model.js'

//fetches only the course data needed for lecture curriculum
export const findCourseCurriculumById = async courseId => {
  return await Course.findOne({
    _id: courseId,
    delete: { $ne: true }
  })
    .select('title subtitle category level thumbnailKey isPublished syllabus')
    .lean() //lean return simple plain object with extra function, also improve performance
}
