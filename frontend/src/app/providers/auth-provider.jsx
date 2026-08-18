import { useEffect } from "react";

import { useGetCurrentUser } from "../../features/auth/queries/use-get-current-user";
import PageLoader from "@/shared/ui/feedback/page-loader";
import { clearUser, setUser, useAppDispatch } from "../store";

const AuthProvider = ({ children }) => {
  const dispatch = useAppDispatch();

  const { data, isLoading, isSuccess, isError } = useGetCurrentUser();

  useEffect(() => {
    if (isSuccess) {
      if (data?.data) {
        dispatch(setUser(data.data));
      } else {
        dispatch(clearUser());
      }

      return;
    }

    if (isError) {
      dispatch(clearUser());
    }
  }, [data, dispatch, isError, isSuccess]);

  if (isLoading) {
    return <PageLoader />;
  }

  return <>{children}</>;
};

export default AuthProvider;
