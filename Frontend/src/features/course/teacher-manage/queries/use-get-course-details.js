import {useQuery} from '@tanstack/react-query'
import { courseQueryKeys } from '../helpers/course-query-keys.js'
import { getCourseDetailsService } from '../services/service-get-course-details.js'

export const useGetCourseDetails = courseId => {
    return useQuery({
        queryKey : courseQueryKeys.courseDetails(courseId),
        queryFn : () => getCourseDetailsService(courseId),
        enabled : Boolean(courseId)
    })
}
