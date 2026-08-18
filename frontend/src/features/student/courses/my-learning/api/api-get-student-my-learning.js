import api from "@/shared/services/axios";

// Calls backend student my learning endpoint.
export const getStudentMyLearningApi = async () => {
  return api.get("/course/student/my-learning");
};
