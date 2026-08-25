import React from "react";
import LectureCourseCard from "./lecture-course-card";

const LectureCourseSkeleton = () => (
  <div className="border border-black/10 bg-white p-5 space-y-4">
    <div className="h-40 w-full bg-black/5 animate-pulse" />
    <div className="flex justify-between">
      <div className="h-3 w-20 bg-black/5 animate-pulse" />
      <div className="h-3 w-16 bg-black/5 animate-pulse" />
    </div>
    <div className="h-6 w-4/5 bg-black/5 animate-pulse" />
    <div className="h-4 w-full bg-black/5 animate-pulse" />
    <div className="grid grid-cols-2 gap-3 pt-2">
      <div className="h-16 bg-black/5 animate-pulse" />
      <div className="h-16 bg-black/5 animate-pulse" />
    </div>
  </div>
);

const LectureCourseGrid = ({ courses, onCourseSelect, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <LectureCourseSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {courses.map((course) => (
        <LectureCourseCard
          key={course._id}
          course={course}
          onSelect={onCourseSelect}
        />
      ))}
    </div>
  );
};

export default LectureCourseGrid;
