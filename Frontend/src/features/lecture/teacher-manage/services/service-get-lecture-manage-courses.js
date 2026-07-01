import { getLectureManageCoursesApi } from '../api/api-get-lecture-manage-courses.js'


//extracts course card data from the backend api response
export const getLectureManageCoursesService = async () => {
    const response = await getLectureManageCoursesApi()
    return response.data.data.courses
}
