import { getLectureCourseCurriculumApi } from '../api/api-get-lecture-course-curriculum.js'

//extracts curriculum data from the backend api response

export const getLectureCourseCurriculumService = async (courseId) => {
    const response = await getLectureCourseCurriculumApi(courseId)
    return response.data.data.curriculum
}
