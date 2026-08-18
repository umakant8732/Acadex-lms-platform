import MyLearningCoursesGrid from "../components/my-learning-courses-grid";
import MyLearningHero from "../components/my-learning-hero";
import { useStudentMyLearningPage } from "../hooks/use-student-my-learning-page";

const StudentMyLearningPage = () => {
  const {
    courses,
    totalEnrolled,
    isLoading,
    isError,
    error,
    refetchCourses,
  } = useStudentMyLearningPage();

  return (
    <section>
      <MyLearningHero totalEnrolled={totalEnrolled} />

      <MyLearningCoursesGrid
        courses={courses}
        isLoading={isLoading}
        isError={isError}
        error={error}
        onRetry={refetchCourses}
      />
    </section>
  );
};

export default StudentMyLearningPage;
