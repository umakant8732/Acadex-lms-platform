import {useQuery} from '@tanstack/react-query'
import { courseQueryKeys } from '../helpers/course-query-keys.js'
import { getManageCoursesService } from '../services/service-get-manage-courses.js'

export const useGetManageCourses = ({
  page = 1,
  limit = 10,
  search = '',
  category = ''
} = {}) => {
  const params = {
    page,
    limit,
    search,
    category
  }

  return useQuery({
    queryKey: courseQueryKeys.manageCourses(params),
    queryFn: () => getManageCoursesService(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false
  })
}
