import { motion } from "framer-motion";
import { FiAward, FiDollarSign, FiUsers } from "react-icons/fi";
import { useGetTopCourses } from "../queries/use-get-top-courses";

const RecentCourses = () => {
  const { data: topCourses = [], isLoading } = useGetTopCourses(4);

  return (
    <div className="border border-black/10 bg-white p-6 transition-all hover:border-black">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center bg-black/5 text-black">
          <FiAward />
        </div>
        <h2 className="text-lg font-semibold text-black">Top Performing Courses</h2>
      </div>

      {isLoading ? (
        <div className="mt-8 space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center justify-between border-b border-black/5 pb-4 last:border-b-0">
              <div className="flex items-center gap-4">
                <div className="h-9 w-9 animate-pulse bg-black/5" />
                <div className="space-y-2">
                  <div className="h-4 w-36 animate-pulse bg-black/5" />
                  <div className="h-3 w-20 animate-pulse bg-black/5" />
                </div>
              </div>
              <div className="h-6 w-24 animate-pulse bg-black/5" />
            </div>
          ))}
        </div>
      ) : topCourses.length === 0 ? (
        <div className="mt-8 flex h-40 items-center justify-center text-sm text-black/40">
          No courses published yet.
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {topCourses.map((course, index) => (
            <motion.div
              key={course.id || course.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              className="group flex flex-col gap-4 border-b border-black/5 pb-4 last:border-b-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-4">
                {/* Rank Badge */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-black/10 text-sm font-semibold text-black group-hover:border-black group-hover:bg-black group-hover:text-white">
                  #{index + 1}
                </div>

                <div>
                  <h3 className="font-semibold text-black group-hover:text-black/80 transition-colors">
                    {course.title}
                  </h3>
                  <span className="mt-1 inline-block text-xs uppercase tracking-wider text-black/40">
                    {course.category}
                  </span>
                </div>
              </div>

              {/* Metrics */}
              <div className="flex items-center gap-6 sm:text-right">
                <div className="flex items-center gap-1.5">
                  <FiUsers className="text-black/35" />
                  <div>
                    <p className="text-xs text-black/40">Sales</p>
                    <p className="text-sm font-semibold text-black">{course.sales}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <FiDollarSign className="text-black/35" />
                  <div>
                    <p className="text-xs text-black/40">Revenue</p>
                    <p className="text-sm font-semibold text-black">{course.revenue}</p>
                  </div>
                </div>

                <div className="hidden items-center justify-center border border-black/10 px-2 py-0.5 text-xs font-semibold text-black md:flex">
                  ★ {course.rating}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentCourses;

