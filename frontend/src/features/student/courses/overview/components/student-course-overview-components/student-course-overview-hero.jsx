import { Link } from "react-router-dom";

import { formatCoursePrice } from "@/shared/utils/course/format-course-price";

// Formats expiry date for student overview header.
const formatExpiryDate = (expiresAt) => {
  if (!expiresAt) {
    return null;
  }

  return new Date(expiresAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const StudentCourseOverviewHero = ({
  course,
  contentStats,
  primaryActionPath,
  previewActionPath,
  checkoutActionPath,
  canWatchPreview,
}) => {
  const courseThumbnail = course.thumbnail?.trim();
  const expiryText = formatExpiryDate(course.access?.expiresAt);
  const isPurchased = Boolean(course.access?.isPurchased);
  const hasPreviewLessons = contentStats.previewLessons > 0;

  return (
    <section className="mt-5 border border-black/10 bg-white p-6 lg:p-8">
      <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
        <div className="overflow-hidden border border-black/10 bg-black/5">
          {courseThumbnail ? (
            <img
              src={courseThumbnail}
              alt={course.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex min-h-[220px] items-center justify-center bg-black px-6 text-center text-3xl font-semibold text-white">
              {course.title}
            </div>
          )}
        </div>

        <div className="space-y-6">
          {expiryText && (
            <div className="flex justify-end">
              <span className="border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-amber-700">
                Expires {expiryText}
              </span>
            </div>
          )}

          <div className="space-y-3">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-black">
              {course.title}
            </h1>

            <p className="max-w-3xl text-sm leading-7 text-black/60">
              {course.subtitle || course.description}
            </p>

            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-black/45">
              <span>{contentStats.totalSections} sections</span>
              <span>{contentStats.totalLessons} lessons</span>
              <span>{contentStats.previewLessons} preview lessons</span>
              <span>{course.level}</span>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
              {!isPurchased && (
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-semibold text-black">
                    {formatCoursePrice(course.price)}
                  </span>

                  {course.originalPrice > course.price && (
                    <>
                      <span className="pb-0.5 text-black/30 line-through text-lg">
                        {formatCoursePrice(course.originalPrice)}
                      </span>
                      <span className="shrink-0 rounded-sm border border-rose-100 bg-rose-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-600">
                        {Math.round(
                          ((course.originalPrice - course.price) /
                            course.originalPrice) *
                            100
                        )}% OFF
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              {isPurchased ? (
                <Link
                  to={primaryActionPath}
                  className="flex h-12 min-w-[180px] items-center justify-center bg-black px-6 text-sm font-medium text-white transition hover:opacity-90"
                >
                  {course.access?.primaryAction?.label || "Continue"}
                </Link>
              ) : (
                <>
                  {canWatchPreview && (
                    <Link
                      to={previewActionPath}
                      className="flex h-12 min-w-[180px] items-center justify-center border border-black px-6 text-sm font-medium text-black transition hover:bg-black hover:text-white"
                    >
                      Watch Preview
                    </Link>
                  )}

                  <Link
                    to={checkoutActionPath}
                    className="flex h-12 min-w-[180px] items-center justify-center bg-black px-6 text-sm font-medium text-white transition hover:opacity-90"
                  >
                    Buy now to unlock
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentCourseOverviewHero;
