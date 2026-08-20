import { useQuery } from "@tanstack/react-query";
import { studentWishlistQueryKeys } from "../helpers/student-wishlist-query-keys.js";
import { getStudentWishlistService } from "../services/service-get-student-wishlist.js";

// Fetch student wishlist courses query.
export const useGetStudentWishlist = () => {
  return useQuery({
    queryKey: studentWishlistQueryKeys.courses(),
    queryFn: getStudentWishlistService,
    staleTime: 2 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
