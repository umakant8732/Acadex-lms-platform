import Lecture from '../../models/lecture-model.js'
import ApiError from '../../../../utils/api-error.js'
import { LECTURE_STATUS } from '../../constants/lecture-constants.js'

/**
 * Service to toggle isPreview status of a lecture.
 * Ensures the lecture exists, is not soft-deleted, and is in READY state.
 */
export const togglePreviewLectureService = async ({ lectureId, isPreview }) => {
  // 1. Check if the active lecture exists
  const lecture = await Lecture.findOne({
    _id: lectureId,
    delete: { $ne: true }
  })

  if (!lecture) {
    throw new ApiError(404, 'Lecture not found')
  }

  // 2. Safety constraint check: Status must be READY ('ready')
  if (lecture.status !== LECTURE_STATUS.READY) {
    throw new ApiError(
      400,
      'Lecture video must be fully processed and ready before setting it as previewable'
    )
  }

  // 3. Update preview state in DB
  lecture.isPreview = isPreview
  await lecture.save()

  return lecture
}
