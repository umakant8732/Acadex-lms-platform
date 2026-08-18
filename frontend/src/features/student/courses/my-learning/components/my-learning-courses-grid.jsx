import { useNavigate } from "react-router-dom";

import StudentCourseCard from "@/features/student/dashboard/components/student-course-card";
import SectionQueryError from "@/shared/ui/feedback/section-query-error";

const CourseCardSkeleton = () => {
  return (
    <div className="flex h-full flex-col overflow-hidden border border-black/5 bg-white">
      <div className="h-56 animate-pulse bg-black/5" />

      <div className="flex flex-1 flex-col p-6">
        <div className="h-3 w-28 animate-pulse bg-black/5" />
        <div className="mt-5 h-8 w-4/5 animate-pulse bg-black/5" />
        <div className="mt-3 h-4 w-full animate-pulse bg-black/5" />
        <div className="mt-2 h-4 w-5/6 animate-pulse bg-black/5" />

        <div className="mt-auto pt-7">
          <div className="h-12 w-full animate-pulse bg-black/5" />
        </div>
      </div>
    </div>
  );
};

const MyLearningCoursesGrid = ({
  courses,
  isLoading,
  isError,
  error,
  onRetry,
}) => {
  const navigate = useNavigate();

  const handleBrowseCourses = () => {
    navigate("/student");
  };

  if (isLoading) {
    return (
      <div className="mt-10 grid items-stretch gap-8 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <CourseCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <SectionQueryError
        eyebrow="My Learning"
        title="Unable to load your enrolled courses"
        message={
          error?.response?.data?.message ||
          "Something went wrong while fetching your learning library."
        }
        onAction={onRetry}
      />
    );
  }

  if (courses.length === 0) {
    return (
      <SectionQueryError
        variant="empty"
        eyebrow="My Learning"
        title="No enrolled courses yet"
        message="Browse the course catalog, purchase a course, and it will appear here for quick access."
        actionLabel="Browse Courses"
        onAction={handleBrowseCourses}
      />
    );
  }

  return (
    <div className="mt-10 grid items-stretch gap-8 md:grid-cols-2 xl:grid-cols-3">
      {courses.map((course) => (
        <StudentCourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default MyLearningCoursesGrid;
