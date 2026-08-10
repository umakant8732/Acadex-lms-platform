import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { useGetLectureCourseCurriculum } from "../queries/use-get-lecture-course-curriculum";
import { useCreateLecturePresignedUploadUrl } from "../queries/use-create-lecture-presigned-upload-url";
import { useCompleteLectureUpload } from "../queries/use-complete-lecture-upload";
import { uploadLectureVideoToS3Service } from "../services/service-upload-lecture-video-to-s3";
import { canStartFirstLectureUpload } from "../constants/lecture-status";
import { useLectureStatusSocket } from "./use-lecture-status-socket";
import { useGetLecturePlaybackAccess } from "../queries/use-get-lecture-playback-access";
import { showError, showSuccess } from "@/shared/utils/toast";
import { getApiErrorMessage } from "@/shared/utils/get-api-error-message";
import { useRetryLectureTranscode } from "../queries/use-retry-lecture-transcode";
import { useTogglePreviewLecture } from "../queries/use-toggle-preview-lecture";

// Handles curriculum data and lecture upload flow.
export const useLectureCurriculumPage = () => {
  const { courseId } = useParams();
  const videoInputRef = useRef(null);
  const [uploadingLessonIds, setUploadingLessonIds] = useState([]);
  const [selectedUploadTarget, setSelectedUploadTarget] = useState(null);
  const [uploadProgressByLessonId, setUploadProgressByLessonId] = useState({});
  const [selectedPlayback, setSelectedPlayback] = useState(null);

  useLectureStatusSocket(courseId);

  const curriculumQuery = useGetLectureCourseCurriculum(courseId);
  const presignedUploadUrlMutation = useCreateLecturePresignedUploadUrl();
  const completeUploadMutation = useCompleteLectureUpload();
  const retryTranscodeMutation = useRetryLectureTranscode(courseId || "");
  const playbackAccessMutation = useGetLecturePlaybackAccess();
  const togglePreviewMutation = useTogglePreviewLecture(courseId || "");

  // Creates signed url, uploads file to s3, then updates backend.
  const handleUploadLesson = async ({ section, lesson, file }) => {
    const lessonId = lesson._id;

    try {
      setUploadingLessonIds((currentIds) => [...currentIds, lessonId]);

      // Ask backend for s3 upload url.
      const presignedUploadSession =
        await presignedUploadUrlMutation.mutateAsync({
          courseId: courseId || "",
          sectionId: section._id,
          lessonId: lesson._id,
          fileName: file.name,
          mimeType: file.type,
          size: file.size,
        });

      // Upload selected file direct to s3.
      await uploadLectureVideoToS3Service(
        presignedUploadSession.presignedUploadUrl,
        file,
        (progress) => {
          setUploadProgressByLessonId((currentProgress) => ({
            ...currentProgress,
            [lessonId]: progress,
          }));
        },
      );

      // Tell backend that s3 upload is done.
      await completeUploadMutation.mutateAsync({
        lectureId: presignedUploadSession.lectureId,
        videoAssetId: presignedUploadSession.videoAssetId,
        originalKey: presignedUploadSession.originalKey,
      });

      showSuccess("Video uploaded. Processing started.");
    } catch (error) {
      showError(getApiErrorMessage(error, "Unable to upload lecture video"));
    } finally {
      setUploadingLessonIds((currentIds) =>
        currentIds.filter((currentLessonId) => currentLessonId !== lessonId),
      );

      setUploadProgressByLessonId((currentProgress) => {
        const nextProgress = { ...currentProgress };
        delete nextProgress[lessonId];
        return nextProgress;
      });
    }
  };

  // Opens file picker for selected lesson.
  const handleUploadButtonClick = ({ section, lesson }) => {
    const lectureStatus = lesson.lecture?.status;

    if (
      uploadingLessonIds.includes(lesson._id) ||
      !canStartFirstLectureUpload(lectureStatus)
    ) {
      return;
    }

    setSelectedUploadTarget({ section, lesson });
    videoInputRef.current?.click();
  };

  // Starts upload after teacher selects video file.
  const handleVideoFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file || !selectedUploadTarget) {
      event.target.value = "";
      setSelectedUploadTarget(null);
      return;
    }

    // Frontend validation for 0-byte file to prevent raw JSON error from backend validation
    if (file.size === 0) {
      showError(
        "The selected video file is empty (0 bytes). Please upload a valid video file.",
      );
      event.target.value = "";
      setSelectedUploadTarget(null);
      return;
    }

    // 2. Add 30 MB max size check (31457280 bytes)
    const MAX_SIZE = 30 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      showError(
        "Video file size exceeds the 30 MB limit. Please compress your video or upload a smaller one.",
      );
      event.target.value = "";
      setSelectedUploadTarget(null);
      return;
    }

    const allowedVideoMimeTypes = [
      "video/mp4",
      "video/webm",
      "video/quicktime",
    ];
    if (!allowedVideoMimeTypes.includes(file.type)) {
      showError("Only MP4, WebM, and MOV videos are allowed.");
      event.target.value = "";
      setSelectedUploadTarget(null);
      return;
    }

    void handleUploadLesson({
      section: selectedUploadTarget.section,
      lesson: selectedUploadTarget.lesson,
      file,
    });

    event.target.value = "";
    setSelectedUploadTarget(null);
  };

  // Gets fresh signed playback URL when teacher clicks Watch.
  const handleWatchLecture = async (lesson) => {
    const lectureId = lesson.lecture?._id;

    if (!lectureId) {
      return;
    }

    try {
      const playbackAccess =
        await playbackAccessMutation.mutateAsync(lectureId);
      setSelectedPlayback(playbackAccess);
    } catch (error) {
      showError(getApiErrorMessage(error, "Unable to open lecture playback"));
    }
  };

  // Shows player level errors like expired signed url or hls load fail.
  const handlePlaybackError = (message) => {
    showError(message || "Unable to play this lecture right now");
  };

  // Clears selected playback when teacher closes preview player.
  const handleClosePlayback = () => {
    setSelectedPlayback(null);
  };

  //triggers transcode reprocessing on background Bullmq queue
  const handleRetryTranscode = async (lectureId) => {
    try {
      await retryTranscodeMutation.mutateAsync({
        lectureId,
      });

      showSuccess("Transcoding retry started successfully");
    } catch (error) {
      showError(getApiErrorMessage(error, "Unable to retry transcoding"));
    }
  };

  const handleTogglePreview = async (lectureId, isPreview) => {
    try {
      await togglePreviewMutation.mutateAsync({ lectureId, isPreview });
      showSuccess("Preview status updated successfully");
    } catch (error) {
      showError(getApiErrorMessage(error, "Unable to update preview status"));
    }
  };

  return {
    courseId,
    curriculum: curriculumQuery.data ?? null,
    isLoading: curriculumQuery.isLoading,
    isError: curriculumQuery.isError,
    error: curriculumQuery.error,
    refetchCurriculum: () => {
      void curriculumQuery.refetch();
    },

    handleUploadButtonClick,
    handleVideoFileChange,
    videoInputRef,
    uploadProgressByLessonId,
    uploadingLessonIds,

    selectedPlayback,
    playbackLoadingLectureId: playbackAccessMutation.isPending
      ? playbackAccessMutation.variables
      : null,
    handleWatchLecture,
    handleClosePlayback,
    handlePlaybackError,

    handleRetryTranscode,
    retryLoadingLectureId: retryTranscodeMutation.isPending
      ? retryTranscodeMutation.variables?.lectureId
      : null,

    handleTogglePreview,
    isTogglePreviewPending: togglePreviewMutation.isPending,
  };
};
