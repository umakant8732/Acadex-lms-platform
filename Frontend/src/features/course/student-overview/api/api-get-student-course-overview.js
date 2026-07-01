import api from "../../../../shared/services/axios.js";

//calls backend student overview endPoint

export const getStudentCourseOverviewApi = async courseId => {
    return await api.get(`/course/student/courses/${courseId}`)
}