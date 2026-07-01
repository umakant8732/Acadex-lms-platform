import { useQueryClient, useMutation } from '@tanstack/react-query'

import { courseQueryKeys } from '../helpers/course-query-keys.js'
import { lectureQueryKeys } from '../../../lecture/teacher-manage/helpers/lecture-query-keys.js'
import { changePublishStatusService } from '../services/service-change-publish-status.js'

export const useChangePublishStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: changePublishStatusService,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: courseQueryKeys.manageCoursesRoot
      })

      queryClient.invalidateQueries({
        queryKey: courseQueryKeys.courseDetails(variables.courseId)
      })

      queryClient.invalidateQueries({
        queryKey: ['published-courses']
      })

      queryClient.invalidateQueries({
        queryKey: lectureQueryKeys.manageCourses
      })
    }
  })
}
