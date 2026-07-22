import {useMutation, useQueryClient} from '@tanstack/react-query'
import { togglePreviewLectureService } from '../services/service-toggle-preview-lecture.js'
import { TogglePreviewLecturePayload } from '../types/teacher-lecture-types'
import { lectureQueryKeys } from '../helpers/lecture-query-keys.js'


//mutation hook to handle preview toggle request and refresh teacher curriculum query

export const useTogglePreviewLecture = (courseId: string) => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, TogglePreviewLecturePayload>({
        mutationFn : togglePreviewLectureService,
        onSuccess : () => {
            void queryClient.invalidateQueries({
                queryKey : lectureQueryKeys.courseCurriculum(courseId)
            })
        }
    })
}