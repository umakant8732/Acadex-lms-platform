import { useQuery } from '@tanstack/react-query'
import { getCategorySplitService } from '../services/service-get-category-split'

export const useGetCategorySplit = () => {
  return useQuery({
    queryKey: ['teacher-category-split'],
    queryFn: getCategorySplitService
  })
}
