import { motion } from "framer-motion";
import { FiDollarSign, FiUsers, FiBookOpen, FiActivity } from "react-icons/fi";
import { useGetTeacherAnalytics } from "../queries/use-get-teacher-analytics";

const DashboardStats = () => {
  const { data, isLoading } = useGetTeacherAnalytics();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 animate-pulse border border-black/10 bg-black/5" />
        ))}
      </div>
    );
  }

  // Format growth badge text
  const fmtGrowth = (val) =>
    val === null ? "No data" : val >= 0 ? `+${val}%` : `${val}%`;

  const stats = [
    {
      title: "Total Revenue",
      value: data?.totalRevenue != null
        ? `₹ ${data.totalRevenue.toLocaleString("en-IN")}`
        : "₹ 0",
      growth: fmtGrowth(data?.revenueGrowth),
      description: "Since last month",
      icon: FiDollarSign,
      color: "from-emerald-500/10 to-teal-500/10 text-emerald-600",
    },
    {
      title: "Total Enrollments",
      value: data?.totalEnrollments?.toLocaleString("en-IN") ?? "0",
      growth: fmtGrowth(data?.enrollmentGrowth),
      description: "New students registered",
      icon: FiUsers,
      color: "from-blue-500/10 to-indigo-500/10 text-blue-600",
    },
    {
      title: "Published Courses",
      value: data?.publishedCourses ?? "0",
      growth: data?.newCoursesThisMonth > 0
        ? `+${data.newCoursesThisMonth} new`
        : "No new",
      description: "Active in catalog",
      icon: FiBookOpen,
      color: "from-purple-500/10 to-pink-500/10 text-purple-600",
    },
    {
      title: "Payment Success Rate",
      value: data?.paymentSuccessRate != null ? `${data.paymentSuccessRate}%` : "100%",
      growth: "Stable",
      description: "Gateway status",
      icon: FiActivity,
      color: "from-amber-500/10 to-orange-500/10 text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -4, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.05)" }}
            className="group relative overflow-hidden border border-black/10 bg-white p-6 transition-all duration-300 hover:border-black"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-black/45">
                  {item.title}
                </p>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight text-black">
                  {item.value}
                </h3>
              </div>

              <div className={`flex h-10 w-10 items-center justify-center bg-gradient-to-br ${item.color}`}>
                <IconComponent className="text-lg" />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-3">
              <span className="text-xs text-black/40">{item.description}</span>
              <span className={`text-xs font-semibold ${
                item.growth.startsWith("+")
                  ? "text-emerald-600"
                  : item.growth === "Stable"
                  ? "text-amber-600"
                  : item.growth.startsWith("-")
                  ? "text-red-500"
                  : "text-black/50"
              }`}>
                {item.growth}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DashboardStats;

