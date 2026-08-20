import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleStudentWishlistService } from "../services/student-wishlist-service.js";
import { studentLibraryQueryKeys } from "../../courses/library/helpers/student-library-query-keys.js";
import { studentWishlistQueryKeys } from "../helpers/student-wishlist-query-keys.js";

// Hook to toggle student wishlist state using standard invalidation.
export const useToggleStudentWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleStudentWishlistService,
    onSuccess: () => {
      // Invalidate the library courses list to trigger refetch
      queryClient.invalidateQueries({
        queryKey: studentLibraryQueryKeys.courses(),
      });
      // Invalidate the wishlist page courses list to trigger refetch
      queryClient.invalidateQueries({
        queryKey: studentWishlistQueryKeys.courses(),
      });
    },
  });
};