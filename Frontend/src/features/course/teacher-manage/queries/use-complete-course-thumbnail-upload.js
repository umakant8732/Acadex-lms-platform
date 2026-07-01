import { useMutation, useQueryClient } from '@tanstack/react-query'

import { courseCatalogQueryKeys } from '../../../course/catalog/helpers/course-catalog-query-keys.js'
import { lectureQueryKeys } from '../../../lecture/teacher-manage/helpers/lecture-query-keys.js'
import { studentLibraryQueryKeys } from '../../../course/student-library/helpers/student-library-query-keys.js'
import { studentOverviewQueryKeys } from '../../../course/student-overview/helpers/student-overview-query-keys.js'
import { coursePreviewQueryKeys } from '../../../course/preview/helpers/course-preview-query-keys.js'

import { courseQueryKeys } from '../helpers/course-query-keys.js'
import { completeCourseThumbnailUploadService } from '../services/service-complete-course-thumbnail-upload.js'

// Saves new thumbnail key and refreshes every course surface that can show it.
export const useCompleteCourseThumbnailUpload = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: completeCourseThumbnailUploadService,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: courseQueryKeys.manageCoursesRoot
      })

      queryClient.invalidateQueries({
        queryKey: courseQueryKeys.courseDetails(variables.courseId)
      })

      queryClient.invalidateQueries({
        queryKey: coursePreviewQueryKeys.courseDetails(variables.courseId)
      })

      queryClient.invalidateQueries({
        queryKey: courseCatalogQueryKeys.publishedCourses
      })

      queryClient.invalidateQueries({
        queryKey: lectureQueryKeys.manageCourses
      })

      queryClient.invalidateQueries({
        queryKey: lectureQueryKeys.courseCurriculum(variables.courseId)
      })

      queryClient.invalidateQueries({
        queryKey: studentLibraryQueryKeys.root
      })

      queryClient.invalidateQueries({
        queryKey: studentOverviewQueryKeys.course(variables.courseId)
      })
    }
  })
}
