import { createBrowserRouter } from "react-router-dom";

import publicRoutes from "./public-routes";
import authRoutes from "./auth-routes";
import studentRoutes from "./student-routes";
import teacherRoutes from "./teacher-routes";

const router = createBrowserRouter([
  publicRoutes,
  authRoutes,
  studentRoutes,
  teacherRoutes
]);

export default router;