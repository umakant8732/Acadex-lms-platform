import { Suspense } from "react";
import PageLoader from "./page-loader";

/**
 * Reusable Suspense wrapper for Route-level Lazy Loading
 */
const LazyLoad = ({ children, subtitle = "Loading..." }) => {
  return (
    <Suspense fallback={<PageLoader fullScreen={false} subtitle={subtitle} />}>
      {children}
    </Suspense>
  );
};

export default LazyLoad;
