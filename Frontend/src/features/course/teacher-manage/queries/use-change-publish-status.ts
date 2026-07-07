import { useMutation } from '@tanstack/react-query'
import { changePublishStatusService } from '../services/service-change-publish-status.js'
import type { ChangePublishStatusPayload, ChangePublishStatusApiResponse } from '../api/api-change-publish-status'

export const useChangePublishStatus = () => {
  return useMutation<ChangePublishStatusApiResponse, Error, ChangePublishStatusPayload>({
    mutationFn: changePublishStatusService
  })
}
