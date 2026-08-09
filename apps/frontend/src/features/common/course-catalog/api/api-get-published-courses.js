import api from "@/shared/services/axios";

// Calls public published-courses endpoint.
export const getPublishedCoursesApi = async () => {
  return api.get("/course/get-published-courses");
};
