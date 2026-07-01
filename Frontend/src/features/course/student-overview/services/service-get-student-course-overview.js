import { getStudentCourseOverviewApi } from "../api/api-get-student-course-overview.js";


//extracts only needed overview payload from backend response
export const getStudentCourseOverviewService = async courseId => {
    const response = await getStudentCourseOverviewApi(courseId)
    return response.data.data.course
}