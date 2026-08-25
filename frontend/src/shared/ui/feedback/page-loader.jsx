import { motion } from "framer-motion";

/**
 * Premium Unified Loader for Acadex
 * Used across route transitions, initial app boots, and page-level async data loading.
 */
const PageLoader = ({
  message = "Loading Acadex",
  subtitle = "Preparing your workspace...",
  fullScreen = true,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="status"
      aria-live="polite"
      className={`relative flex items-center justify-center overflow-hidden bg-[#fafafa] text-black ${
        fullScreen ? "fixed inset-0 z-50 min-h-screen" : "min-h-[420px] w-full py-16"
      } ${className}`}
    >
      {/* 1. Sleek Top Laser Loading Beam */}
      <div className="absolute inset-x-0 top-0 h-[2px] overflow-hidden bg-black/5">
        <motion.div
          className="h-full w-40 bg-black"
          initial={{ x: "-100%" }}
          animate={{ x: "100vw" }}
          transition={{
            repeat: Infinity,
            duration: 1.4,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* 2. Ambient Background Glows */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-black/[0.02] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/[0.03] blur-3xl" />

      {/* 3. Central Brand Motion Unit */}
      <div className="relative flex flex-col items-center text-center px-6">
        {/* Floating Brand Badge with Orbiting Ring */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          {/* Outer Rotating Segmented Border */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-dashed border-black/20"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: "linear",
            }}
          />

          {/* Inner Sharp Brand Box */}
          <motion.div
            className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-black shadow-xl shadow-black/10"
            animate={{
              y: [-3, 3, -3],
              scale: [1, 1.02, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
          >
            <span className="text-base font-bold tracking-wider text-white">
              AC
            </span>

            {/* Glowing Live Green Dot */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
            </span>
          </motion.div>
        </div>

        {/* Brand Name & Loading Message */}
        <motion.div
          className="mt-6 space-y-1.5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-black">
              Acadex
            </span>
            <span className="h-1 w-1 rounded-full bg-black/30" />
            <span className="text-xs font-medium text-black/50">
              Platform
            </span>
          </div>

          <p className="text-xs text-black/40 font-normal">
            {subtitle}
          </p>
        </motion.div>

        {/* Minimal Animated Progress Bar Line */}
        <div className="mt-5 h-[3px] w-36 overflow-hidden rounded-full bg-black/5">
          <motion.div
            className="h-full rounded-full bg-black"
            initial={{ x: "-100%", width: "45%" }}
            animate={{ x: "250%" }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      <span className="sr-only">{message}</span>
    </motion.div>
  );
};

export default PageLoader;
