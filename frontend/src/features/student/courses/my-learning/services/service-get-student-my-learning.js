import { getStudentMyLearningApi } from "../api/api-get-student-my-learning";

// Extracts my learning payload from backend response.
export const getStudentMyLearningService = async () => {
  const response = await getStudentMyLearningApi();
  return response.data.data;
};
