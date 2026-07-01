import asyncHandler from '../../../../utils/async-handler.js'
import ApiResponse from '../../../../utils/api-response.js'

import { getPlaybackAccessService } from '../../services/shared/get-playback-access-service.js'

// Reads lecture id and user, then returns temporary secure playback access.
export const getPlaybackAccess = asyncHandler(async (req, res) => {
  const { lectureId } = req.params
  const user = req.user

  const playbackAccess = await getPlaybackAccessService({
    lectureId,
    user
  })

  return res.status(200).json(
    new ApiResponse(200, 'Lecture playback access fetched successfully', {
      playbackAccess
    })
  )
})
