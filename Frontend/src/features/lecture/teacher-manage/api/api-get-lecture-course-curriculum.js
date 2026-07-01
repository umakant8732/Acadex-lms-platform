import api from "../../../../shared/services/axios.js";

//calls backend api that returns one course syllabus  with lecture upload status

export const getLectureCourseCurriculumApi = async (courseId) => {
    return await api.get(`/lecture/manage-courses/${courseId}/curriculum`)
}
