import { useQuery } from "@tanstack/react-query";
import { getLectureCourseCurriculumService } from "../services/service-get-lecture-course-curriculum";
import { lectureQueryKeys } from "../helpers/lecture-query-keys";

// Returns the full course syllabus along with lecture statuses for teacher.
export const useGetLectureCourseCurriculum = (courseId) => {
  return useQuery({
    queryKey: lectureQueryKeys.courseCurriculum(courseId),
    queryFn: () => getLectureCourseCurriculumService(courseId),
    enabled: !!courseId,
  });
};
