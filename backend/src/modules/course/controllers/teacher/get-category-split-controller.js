import ApiResponse from '../../../../shared/utils/api-response.js'
import asyncHandler from '../../../../shared/utils/async-handler.js'
import { getCategorySplitService } from '../../services/teacher/get-category-split-service.js'

export const getCategorySplit = asyncHandler(async (req, res) => {
  const data = await getCategorySplitService()

  return res
    .status(200)
    .json(new ApiResponse(200, 'Category split fetched successfully', data))
})
