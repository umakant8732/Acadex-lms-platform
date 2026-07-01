
import { getCourseDetailsApi } from '../api/api-get-course-details.js'

export const getCourseDetailsService = async (courseId) => {
    const response = await getCourseDetailsApi(courseId)
    return response.data.data
}
