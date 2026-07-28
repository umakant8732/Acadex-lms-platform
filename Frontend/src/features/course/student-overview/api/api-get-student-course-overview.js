import api from "../../../../shared/services/axios";

// Calls backend student overview endpoint.
export const getStudentCourseOverviewApi = async (courseId) => {
  return api.get(`/course/student/courses/${courseId}`);
};
