import { Navigate } from "react-router-dom";

import { selectAuthUser, useAppSelector } from "../app/store";

const RoleRoute = ({ children, allowedRole }) => {
  const user = useAppSelector(selectAuthUser);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RoleRoute;
