import { useQuery } from "@tanstack/react-query";

import { studentMyLearningQueryKeys } from "../helpers/student-my-learning-query-keys";
import { getStudentMyLearningService } from "../services/service-get-student-my-learning";

// Uses query because enrolled courses come from server state.
export const useGetStudentMyLearning = () => {
  return useQuery({
    queryKey: studentMyLearningQueryKeys.courses(),
    queryFn: getStudentMyLearningService,
    staleTime: 2 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
