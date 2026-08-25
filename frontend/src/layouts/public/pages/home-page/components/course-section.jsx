import { motion } from "framer-motion";

import CourseCard from "./course-card";
import SectionQueryError from "@/shared/ui/feedback/section-query-error";
import { usePublishedCourseCatalog } from "../../../../../features/common/course-catalog/hooks/use-published-course-catalog";
import { getApiErrorMessage } from "@/shared/utils/get-api-error-message";

const CourseCardSkeleton = () => (
  <div className="overflow-hidden bg-white">
    {/* Thumbnail Skeleton */}
    <div className="h-72 w-full bg-black/5 animate-pulse" />

    {/* Content Skeleton */}
    <div className="pt-6 space-y-4">
      <div className="flex justify-between">
        <div className="h-3 w-20 bg-black/5 animate-pulse" />
        <div className="h-3 w-14 bg-black/5 animate-pulse" />
      </div>

      <div className="h-8 w-3/4 bg-black/5 animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 w-full bg-black/5 animate-pulse" />
        <div className="h-4 w-5/6 bg-black/5 animate-pulse" />
      </div>

      <div className="flex items-baseline gap-3 pt-2">
        <div className="h-9 w-28 bg-black/5 animate-pulse" />
        <div className="h-5 w-16 bg-black/5 animate-pulse" />
      </div>

      <div className="h-4 w-36 bg-black/5 animate-pulse pt-2" />
    </div>
  </div>
);

const CoursesSection = () => {
  const { courses, isLoading, isError, error, isSuccess, refetchCourses } =
    usePublishedCourseCatalog();

  return (
    <section id="courses" className="px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="uppercase tracking-[0.3em] text-sm text-black/40">
            Courses
          </p>

          <h2 className="mt-6 text-5xl md:text-6xl font-semibold tracking-tight">
            Explore Popular
            <br />
            Courses
          </h2>
        </motion.div>

        {isError && (
          <SectionQueryError
            variant="error"
            eyebrow="Course Catalog"
            title="Unable to load courses"
            message={getApiErrorMessage(
              error,
              "Something went wrong while loading published courses.",
            )}
            actionLabel="Try Again"
            onAction={refetchCourses}
          />
        )}

        {isSuccess && courses.length === 0 && (
          <SectionQueryError
            variant="empty"
            eyebrow="Course Catalog"
            title="No published courses available"
            message="New courses will appear here as soon as teachers publish them."
            onAction={undefined}
          />
        )}

        {/* Stable Grid Layout: Renders either Skeleton or Real Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {isLoading
            ? [...Array(3)].map((_, idx) => <CourseCardSkeleton key={idx} />)
            : courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
