import { useQuery } from '@tanstack/react-query'
import { getRecentStudentsService } from '../services/service-get-recent-students'

export const useGetRecentStudents = (limit = 5) => {
  return useQuery({
    queryKey: ['teacher-recent-students', limit],
    queryFn: () => getRecentStudentsService(limit)
  })
}
