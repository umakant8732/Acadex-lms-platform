import { useMutation, useQueryClient } from '@tanstack/react-query'
import { changePublishStatusService } from '../services/service-change-publish-status.js'
import type { ChangePublishStatusPayload, ChangePublishStatusApiResponse } from '../api/api-change-publish-status'
import { courseQueryKeys } from '../helpers/course-query-keys.js'

export const useChangePublishStatus = () => {
  const queryClient = useQueryClient()

  return useMutation<ChangePublishStatusApiResponse, Error, ChangePublishStatusPayload>({
    mutationFn: changePublishStatusService,
    onSuccess: () => {
      // Invalidate manage courses list so isPublished refreshes and button text toggles.
      queryClient.invalidateQueries({ queryKey: courseQueryKeys.manageCoursesRoot })
    }
  })
}
