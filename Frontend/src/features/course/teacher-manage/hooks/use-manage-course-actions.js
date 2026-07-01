import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useChangePublishStatus } from '../queries/use-change-publish-status.js'
import { useCreateCourseThumbnailPresignedUploadUrl } from '../queries/use-create-course-thumbnail-presigned-upload-url.js'
import { useCompleteCourseThumbnailUpload } from '../queries/use-complete-course-thumbnail-upload.js'
import { useDeleteCourse } from '../queries/use-delete-course.js'
import {
  allowedCourseThumbnailMimeTypes,
  maxCourseThumbnailUploadSize
} from '../constants/course-thumbnail-upload.js'
import { uploadCourseThumbnailToS3Service } from '../services/service-upload-course-thumbnail-to-s3.js'
import { showError, showSuccess } from '../../../../shared/utils/toast.js'
import { getApiErrorMessage } from '../../../../shared/utils/get-api-error-message.js'

const validateCourseThumbnailFile = file => {
  if (!file) {
    return 'Please select a thumbnail image'
  }

  if (!allowedCourseThumbnailMimeTypes.includes(file.type)) {
    return 'Only JPG, PNG, and WebP images are allowed'
  }

  if (file.size > maxCourseThumbnailUploadSize) {
    return 'Thumbnail image size cannot be more than 5 MB'
  }

  return null
}

export const useManageCourseActions = () => {
  const navigate = useNavigate()

  const [courseToDelete, setCourseToDelete] = useState(null)
  const [publishingCourseId, setPublishingCourseId] = useState(null)
  const [uploadingThumbnailCourseId, setUploadingThumbnailCourseId] =
    useState(null)

  const deleteCourseMutation = useDeleteCourse()
  const changePublishStatusMutation = useChangePublishStatus()
  const createThumbnailPresignedUploadUrlMutation =
    useCreateCourseThumbnailPresignedUploadUrl()
  const completeThumbnailUploadMutation = useCompleteCourseThumbnailUpload()

  const openDeleteModal = course => {
    setCourseToDelete(course)
  }

  const closeDeleteModal = () => {
    if (deleteCourseMutation.isPending) {
      return
    }

    setCourseToDelete(null)
  }

  const handleDeleteCourse = async () => {
    if (!courseToDelete?._id) {
      return
    }

    try {
      const response = await deleteCourseMutation.mutateAsync(
        courseToDelete._id
      )

      showSuccess(response.message || 'Course deleted successfully')
      setCourseToDelete(null)
    } catch (error) {
      showError(error?.response?.data?.message || 'Failed to delete course')
    }
  }

  const handleTogglePublishStatus = async course => {
    if (!course?._id) {
      return
    }

    const nextPublishStatus = !course.isPublished

    setPublishingCourseId(course._id)

    try {
      const response = await changePublishStatusMutation.mutateAsync({
        courseId: course._id,
        isPublished: nextPublishStatus
      })

      showSuccess(
        response.message ||
          (nextPublishStatus
            ? 'Course published successfully'
            : 'Course unpublished successfully')
      )
    } catch (error) {
      showError(
        error?.response?.data?.message || 'Failed to change publish status'
      )
    } finally {
      setPublishingCourseId(null)
    }
  }

  // Creates signed url, uploads image to S3, then saves thumbnail key in course.
  const handleThumbnailFileSelect = async (course, file) => {
    if (!course?._id) {
      return
    }

    const validationMessage = validateCourseThumbnailFile(file)

    if (validationMessage) {
      showError(validationMessage)
      return
    }

    setUploadingThumbnailCourseId(course._id)

    try {
      const presignedThumbnailUpload =
        await createThumbnailPresignedUploadUrlMutation.mutateAsync({
          courseId: course._id,
          fileName: file.name,
          mimeType: file.type,
          size: file.size
        })

      await uploadCourseThumbnailToS3Service(
        presignedThumbnailUpload.presignedUploadUrl,
        file
      )

      const response = await completeThumbnailUploadMutation.mutateAsync({
        courseId: course._id,
        thumbnailKey: presignedThumbnailUpload.thumbnailKey
      })

      showSuccess(response.message || 'Course thumbnail updated successfully')
    } catch (error) {
      showError(
        getApiErrorMessage(error, 'Unable to upload course thumbnail')
      )
    } finally {
      setUploadingThumbnailCourseId(null)
    }
  }

  const goToCreateCoursePage = () => {
    navigate('/teacher/create-course')
  }

  const goToUpdateCoursePage = courseId => {
    navigate(`/teacher/update-course/${courseId}`)
  }

  const goToViewCoursePage = courseId => {
    navigate(`/teacher/view-course/${courseId}`)
  }

  return {
    courseToDelete,
    isDeleteModalOpen: Boolean(courseToDelete),
    isDeletingCourse: deleteCourseMutation.isPending,
    deleteCourseError: deleteCourseMutation.error,

    publishingCourseId,
    handleTogglePublishStatus,

    uploadingThumbnailCourseId,
    handleThumbnailFileSelect,

    openDeleteModal,
    closeDeleteModal,
    handleDeleteCourse,
    goToCreateCoursePage,
    goToViewCoursePage,
    goToUpdateCoursePage
  }
}
