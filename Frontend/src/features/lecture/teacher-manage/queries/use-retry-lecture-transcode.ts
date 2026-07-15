import {useMutation,useQueryClient} from '@tanstack/react-query'
import { retryLectureTranscodeService } from '../services/service-retry-lecture-transcode.js'

import { RetryLectureTranscodePayload } from '../api/api-retry-lecture-transcode'
import { lectureQueryKeys } from '../helpers/lecture-query-keys.js'

//mutation hook to handle transcode retry request and invalidate queries an success

export const useRetryLectureTranscode = (courseId: string) => {

    const queryClient = useQueryClient()

    return useMutation<any,Error, RetryLectureTranscodePayload>({
        mutationFn: retryLectureTranscodeService,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey : lectureQueryKeys.courseCurriculum(courseId)
            })
        }
    })
 
}