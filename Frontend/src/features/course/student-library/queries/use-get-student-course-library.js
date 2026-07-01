import { useQuery } from '@tanstack/react-query'

import { studentLibraryQueryKeys } from '../helpers/student-library-query-keys.js'
import { getStudentCourseLibraryService } from '../services/service-get-student-course-library.js'

// Uses query because student course library comes from server state.
export const useGetStudentCourseLibrary = () => {
  return useQuery({
    queryKey: studentLibraryQueryKeys.courses(),
    queryFn: getStudentCourseLibraryService,
    staleTime: 2 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false
  })
}
