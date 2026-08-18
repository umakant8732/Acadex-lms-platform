import { useGetStudentMyLearning } from "../queries/use-get-student-my-learning";

// Normalizes my learning query output for page consumption.
export const useStudentMyLearningPage = () => {
  const studentMyLearningQuery = useGetStudentMyLearning();
  const myLearningData = studentMyLearningQuery.data;

  return {
    courses: myLearningData?.courses ?? [],
    totalEnrolled: myLearningData?.totalEnrolled ?? 0,
    isLoading: studentMyLearningQuery.isLoading,
    isError: studentMyLearningQuery.isError,
    isSuccess: studentMyLearningQuery.isSuccess,
    error: studentMyLearningQuery.error ?? null,
    refetchCourses: studentMyLearningQuery.refetch,
  };
};
