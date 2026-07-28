import { useParams } from "react-router-dom";
import { useGetCourseDetails } from "../queries/use-get-course-details";

export const useCourseDetailsPage = () => {
  const { courseId } = useParams();
  const courseDetailsQuery = useGetCourseDetails(courseId);

  return {
    courseId,
    course: courseDetailsQuery.data ?? null,
    isLoading: courseDetailsQuery.isLoading,
    isError: courseDetailsQuery.isError,
    error: courseDetailsQuery.error,
    refetchCourse: () => {
      void courseDetailsQuery.refetch();
    },
  };
};
