import api from "../../../../shared/services/axios";

// Calls backend student library endpoint.
export const getStudentCourseLibraryApi = async () => {
  return api.get("/course/student/courses");
};
