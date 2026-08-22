import api from '@/shared/services/axios'

export const getCategorySplitApi = async () => {
  return await api.get('/course/teacher/analytics/category-split')
}
