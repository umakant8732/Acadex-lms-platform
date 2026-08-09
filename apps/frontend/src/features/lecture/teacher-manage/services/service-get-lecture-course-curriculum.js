import { getLectureCourseCurriculumApi } from "../api/api-get-lecture-course-curriculum";

// Extracts clean course syllabus details from backend response.
export const getLectureCourseCurriculumService = async (courseId) => {
  const response = await getLectureCourseCurriculumApi(courseId);
  return response.data.data.curriculum;
};
