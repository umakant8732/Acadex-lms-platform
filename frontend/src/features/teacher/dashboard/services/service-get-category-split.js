import { getCategorySplitApi } from '../api/api-get-category-split'

export const getCategorySplitService = async () => {
  const response = await getCategorySplitApi()
  return response.data.data
}
