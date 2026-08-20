import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetStudentWishlist } from "../queries/use-get-student-wishlist";
import StudentCourseCard from "../components/student-course-card";
import SectionQueryError from "@/shared/ui/feedback/section-query-error";

const WishlistHero = ({ totalItems }) => {
  const itemsLabel = totalItems === 1 ? "course" : "courses";

  return (
    <section className="mt-5 border border-black/5 bg-white p-6 md:p-8">
      <p className="text-xs uppercase tracking-[0.3em] text-black/35">
        My Dashboard
      </p>

      <div className="mt-5 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Courses in your wishlist
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-black/60 md:text-base">
            Keep track of courses you want to enroll in, compare options, and purchase them whenever you're ready.
          </p>
        </div>

        <div className="border border-black/10 bg-[#f5f5f5] p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-black/35">
            Wishlist Items
          </p>

          <p className="mt-4 text-4xl font-semibold tracking-tight">
            {totalItems}
          </p>

          <p className="mt-2 text-sm text-black/55">
            {totalItems} {itemsLabel} saved
          </p>
        </div>
      </div>
    </section>
  );
};

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

const StudentWishlistPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error, refetch } = useGetStudentWishlist();
  const courses = data?.courses ?? [];

  const handleBrowseCourses = () => {
    navigate("/student");
  };

  return (
    <section>
      <WishlistHero totalItems={courses.length} />

      {isLoading ? (
        <div className="mt-10 grid items-stretch gap-8 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <CourseCardSkeleton key={index} />
          ))}
        </div>
      ) : isError ? (
        <div className="mt-10">
          <SectionQueryError
            eyebrow="Wishlist"
            title="Unable to load your wishlist"
            message={
              error?.response?.data?.message ||
              "Something went wrong while fetching your wishlisted courses."
            }
            onAction={refetch}
          />
        </div>
      ) : courses.length === 0 ? (
        <div className="mt-10">
          <SectionQueryError
            variant="empty"
            eyebrow="Wishlist"
            title="Your wishlist is empty"
            message="Explore the catalog and save courses that interest you to keep them here."
            actionLabel="Browse Courses"
            onAction={handleBrowseCourses}
          />
        </div>
      ) : (
        <div className="mt-10 grid items-stretch gap-8 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <StudentCourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
};

export default StudentWishlistPage;
