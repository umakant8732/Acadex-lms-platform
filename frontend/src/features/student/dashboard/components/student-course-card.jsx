import { motion } from "framer-motion";
import { FiHeart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import {
  getCourseDiscount,
} from "@/shared/utils/course/calculate-course-pricing";
import { formatCoursePrice } from "@/shared/utils/course/format-course-price";
import { useToggleStudentWishlist } from "../queries/use-toggle-student-wishlist";
import { showSuccess, showError } from "@/shared/utils/toast";

const StudentCourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { mutate: toggleWishlist, isPending } = useToggleStudentWishlist();
  const courseDiscount = getCourseDiscount(course.price, course.originalPrice);

  const courseThumbnail = course.thumbnail?.trim();
  const courseSummary = course.description;
  const access = course.access;
  const preview = course.preview;
  const courseOverviewPath = `/student/courses/${course._id}`;
  const canWatchPreview = Boolean(
    !access.isPurchased && preview.firstPreviewLessonId,
  );
  const hasPreviewLessons = Boolean(preview.hasPreviewLessons);

  const primaryActionPath = access.isPurchased
    ? `/student/courses/${course._id}/learn`
    : canWatchPreview
      ? `/student/courses/${course._id}/learn/${preview.firstPreviewLessonId}`
      : `/student/checkout/${course._id}`;

  const primaryActionLabel = access.isPurchased
    ? access.primaryAction?.label || "Continue"
    : canWatchPreview
      ? "Watch Preview"
      : access.primaryAction?.label || "Buy now to unlock";

  const helperText = access.isPurchased
    ? "Continue where you left off."
    : canWatchPreview
      ? "Start free, then unlock the complete course anytime."
      : hasPreviewLessons
        ? "Preview lessons are being prepared. Full access is available now."
        : "Unlock the full course to start learning.";

  // Makes full card open overview page.
  const handleCardClick = () => {
    navigate(courseOverviewPath);
  };

  // Keeps keyboard support for whole clickable card.
  const handleCardKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      navigate(courseOverviewPath);
    }
  };

  const handleWishlistToggle = (event) => {
    event.stopPropagation();
    if (isPending) return;
    
    toggleWishlist(course._id, {
      onSuccess: (data) => {
        if (data?.isWishlisted) {
          showSuccess("Course added to wishlist");
        } else {
          showSuccess("Course removed from wishlist");
        }
      },
      onError: (err) => {
        showError(
          err?.response?.data?.message || 
          "Failed to update wishlist"
        );
      }
    });
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      role="link"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      className="flex h-full cursor-pointer flex-col overflow-hidden border border-black/10 bg-white transition-all duration-300 hover:shadow-lg"
    >
      <div className="overflow-hidden border-b border-black/5">
        {courseThumbnail ? (
          <motion.img
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4 }}
            src={courseThumbnail}
            alt={course.title}
            className="h-56 w-full object-cover"
          />
        ) : (
          <div className="flex h-56 items-center justify-center bg-black px-6 text-center text-2xl font-semibold text-white">
            <span className="overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
              {course.title}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-black/45">
            {course.category || "General"}
          </span>

          {access.isPurchased ? (
            <span className="shrink-0 rounded-sm border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
              Enrolled
            </span>
          ) : (
            courseDiscount > 0 && (
              <span className="shrink-0 rounded-sm border border-rose-100 bg-rose-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-600">
                {courseDiscount}% OFF
              </span>
            )
          )}
        </div>

        <h2 className="mt-4 min-h-[4.5rem] overflow-hidden text-2xl font-semibold leading-tight tracking-tight text-black [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
          {course.title}
        </h2>

        <p className="mt-4 min-h-[5.25rem] overflow-hidden text-sm leading-7 text-black/60 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
          {courseSummary ||
            "Explore this published course and unlock the full learning path."}
        </p>


        <div className="mt-6 flex items-end justify-between gap-4">
          {!access.isPurchased ? (
            <div className="flex items-end gap-3">
              <span className="text-3xl font-semibold text-black">
                {formatCoursePrice(course.price)}
              </span>

              {course.originalPrice > course.price && (
                <span className="pb-1 text-black/30 line-through">
                  {formatCoursePrice(course.originalPrice)}
                </span>
              )}
            </div>
          ) : (
            <span />
          )}

          {!access.isPurchased && (
            <button
              type="button"
              disabled={isPending}
              aria-label={access.isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              onClick={handleWishlistToggle}
              className="group flex shrink-0 items-center gap-2 text-black/60 transition hover:text-black disabled:opacity-50"
            >
              <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-medium opacity-0 transition-all duration-200 group-hover:max-w-[10rem] group-hover:opacity-100">
                {access.isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              </span>
              <span className="flex h-9 w-9 items-center justify-center border border-black/10 text-lg transition group-hover:border-black group-hover:bg-black group-hover:text-white">
                <FiHeart className={access.isWishlisted ? "fill-current text-black group-hover:text-white" : ""} />
              </span>
            </button>
          )}
        </div>


        <div className="mt-auto pt-7">
          <Link
            to={primaryActionPath}
            onClick={(event) => event.stopPropagation()}
            className={`flex h-12 w-full items-center justify-center text-sm font-medium transition ${
              canWatchPreview
                ? "border border-black text-black hover:bg-black hover:text-white"
                : "bg-black text-white hover:opacity-90"
            }`}
          >
            {primaryActionLabel}
          </Link>

          <div className="mt-3 flex min-h-[3rem] items-start justify-center text-center text-sm leading-6 text-black/55">
            <p className="overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
              {helperText}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentCourseCard;
