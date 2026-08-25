/* eslint-disable react-refresh/only-export-components */
import LectureCourseGrid from "../../components/manage-lectures-components/lecture-course-grid";
import SectionQueryError from "@/shared/ui/feedback/section-query-error";
import { useManageLecturesPage } from "../../hooks/use-manage-lectures-page";

const ManageLecturesPage = () => {
  const {
    courses,
    isLoading,
    isError,
    error,
    refetchCourses,
    goToCourseCurriculumPage,
  } = useManageLecturesPage();

  return (
    <section className="space-y-6">
      <div className="border border-black/10 bg-white p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-black/35">
            Lecture Manager
          </p>

          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-black">
            Manage Lectures
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-black/60">
            Select a course to upload and manage videos for its syllabus
            lessons.
          </p>
        </div>
      </div>

      {isError ? (
        <SectionQueryError
          variant="error"
          title="Unable to load courses"
          message={
            error?.response?.data?.message ||
            error?.message ||
            "Something went wrong while loading courses for lecture management."
          }
          actionLabel="Retry"
          onAction={refetchCourses}
        />
      ) : (
        <LectureCourseGrid
          courses={courses}
          isLoading={isLoading}
          onCourseSelect={goToCourseCurriculumPage}
        />
      )}
    </section>
  );
};

export default ManageLecturesPage;
