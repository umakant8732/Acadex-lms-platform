import {useQuery} from '@tanstack/react-query'

import { lectureQueryKeys } from '../helpers/lecture-query-keys.js'
import { getLectureManageCoursesService } from '../services/service-get-lecture-manage-courses.js'


//fetches course cards  for the  teacher lecture manager page.
export const useGetLectureManageCourses = () => {
    return useQuery({
        queryKey : lectureQueryKeys.manageCourses,
        queryFn : getLectureManageCoursesService,
        staleTime : 5 * 60 * 1000,
        gcTime : 30 * 60 * 1000,
        refetchOnWindowFocus : false
    })
}
