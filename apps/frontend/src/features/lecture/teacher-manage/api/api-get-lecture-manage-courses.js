import api from "../../../../shared/services/axios";

// Calls backend API that returns courses available for lecture management for teacher
export const getLectureManageCoursesApi = async () => {
  return await api.get("/lecture/manage-courses");
};
