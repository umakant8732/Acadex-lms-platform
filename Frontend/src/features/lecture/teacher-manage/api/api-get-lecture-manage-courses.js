import api from "../../../../shared/services/axios";


//calls backend api that return courses available for lecture management for teacher
export const getLectureManageCoursesApi = async () => {
    return await api.get('/lecture/manage-courses')
}
