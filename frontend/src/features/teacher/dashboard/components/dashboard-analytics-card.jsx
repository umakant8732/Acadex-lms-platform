import { motion, AnimatePresence } from "framer-motion";
import { FiTrendingUp, FiLayers } from "react-icons/fi";
import { useGetRevenueChart } from "../queries/use-get-revenue-chart";
import { useGetCategorySplit } from "../queries/use-get-category-split";
import { useState } from "react";

const BAR_COLORS = [
  "bg-blue-600",
  "bg-purple-600",
  "bg-emerald-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-indigo-600",
  "bg-teal-600",
];

const AnalyticsCard = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const { data: revenueData, isLoading: isRevenueLoading } = useGetRevenueChart();
  const { data: categorySplitData, isLoading: isCategoryLoading } = useGetCategorySplit();

  // SVG dimensions for the curve chart
  const width = 500;
  const height = 180;
  const padding = 20;

  // Use live data or fallback to empty array while loading
  const chartData = revenueData ?? [];

  // Find max value to scale graph correctly (prevent division by zero)
  const maxAmount = chartData.length > 0
    ? Math.max(...chartData.map((d) => d.amount))
    : 1;

  // Generate SVG coordinates for the line chart points
  const points = chartData.map((d, index) => {
    const x = chartData.length > 1
      ? padding + (index * (width - padding * 2)) / (chartData.length - 1)
      : width / 2; // center single point
    const y = height - padding - (d.amount / maxAmount) * (height - padding * 2);
    return { x, y, ...d };
  });

  // Build the path string for the SVG Line (only when points exist)
  const pathD = points.length > 0
    ? points.reduce((acc, point, index) => {
        if (index === 0) return `M ${point.x} ${point.y}`;
        const prev = points[index - 1];
        const cpX1 = prev.x + (point.x - prev.x) / 2;
        const cpY1 = prev.y;
        const cpX2 = prev.x + (point.x - prev.x) / 2;
        const cpY2 = point.y;
        return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${point.x} ${point.y}`;
      }, "")
    : "";

  // Area under the curve (only when we have at least 2 points)
  const areaD = points.length > 1
    ? `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`
    : "";

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* 1. Revenue Growth Trend (Line Chart) */}
      <div className="border border-black/10 bg-white p-6 transition-all hover:border-black">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center bg-black/5 text-black">
              <FiTrendingUp />
            </div>
            <h2 className="text-lg font-semibold text-black">Revenue Growth</h2>
          </div>
        </div>

        {/* Loading skeleton */}
        {isRevenueLoading ? (
          <div className="mt-8 h-[200px] w-full animate-pulse bg-black/5" />
        ) : chartData.length === 0 ? (
          <div className="mt-8 flex h-[200px] items-center justify-center text-sm text-black/40">
            No revenue data available yet.
          </div>
        ) : (
          <>
            {/* Visual Line Chart Area */}
            <div className="relative mt-8 h-[200px] w-full">
              <svg className="h-full w-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradient-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#000000" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.00" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((r, i) => {
                  const y = padding + r * (height - padding * 2);
                  return (
                    <line
                      key={i}
                      x1={padding}
                      y1={y}
                      x2={width - padding}
                      y2={y}
                      stroke="#e5e5e5"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  );
                })}

                {/* Area Path */}
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  d={areaD}
                  fill="url(#gradient-area)"
                />

                {/* Line Path */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1 }}
                  d={pathD}
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Interactive Circles / Points */}
                {points.map((p, idx) => (
                  <g key={idx}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={hoveredPoint === idx ? "6" : "3.5"}
                      fill={hoveredPoint === idx ? "#000" : "#fff"}
                      stroke="#000"
                      strokeWidth="2"
                      className="cursor-pointer transition-all duration-150"
                      onMouseEnter={() => setHoveredPoint(idx)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  </g>
                ))}
              </svg>

              {/* Floating Tooltip */}
              <AnimatePresence>
                {hoveredPoint !== null && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 5 }}
                    className="absolute border border-black bg-white px-2.5 py-1 text-xs font-semibold text-black shadow-md"
                    style={{
                      left: `${(points[hoveredPoint].x / width) * 100}%`,
                      top: `${(points[hoveredPoint].y / height) * 100 - 20}%`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    {points[hoveredPoint].display}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* X-Axis labels */}
            <div className="mt-2 flex justify-between px-3 text-xs font-medium text-black/40">
              {chartData.map((d) => (
                <span key={d.month}>{d.month}</span>
              ))}
            </div>
          </>
        )}
      </div>

      {/* 2. Category Distribution (Visual Gauges) */}
      <div className="border border-black/10 bg-white p-6 transition-all hover:border-black">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center bg-black/5 text-black">
            <FiLayers />
          </div>
          <h2 className="text-lg font-semibold text-black">Category split</h2>
        </div>

        {isCategoryLoading ? (
          <div className="mt-8 space-y-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-4 w-28 animate-pulse bg-black/5" />
                  <div className="h-4 w-16 animate-pulse bg-black/5" />
                </div>
                <div className="h-2 w-full animate-pulse bg-black/5" />
              </div>
            ))}
          </div>
        ) : (categorySplitData?.categorySplit || []).length === 0 ? (
          <div className="mt-8 flex h-[200px] items-center justify-center text-sm text-black/40">
            No category enrollments yet.
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            {categorySplitData.categorySplit.map((cat, idx) => {
              const colorClass = BAR_COLORS[idx % BAR_COLORS.length];

              return (
                <div key={cat.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-black">{cat.name}</span>
                    <span className="font-semibold text-black/60">
                      {cat.percentage}% ({cat.count} {cat.count === 1 ? 'sale' : 'sales'})
                    </span>
                  </div>

                  {/* Progress Bar Container */}
                  <div className="h-2 w-full overflow-hidden bg-black/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.percentage}%` }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className={`h-full ${colorClass}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsCard;
