import axios from 'axios'

// Uploads selected video file direct to s3.
export const uploadLectureVideoToS3Service = async (
  presignedUploadUrl: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<any> => {
  return await axios.put(presignedUploadUrl, file, {
    headers: {
      'Content-Type': file.type
    },

    // Gives upload progress from browser.
    onUploadProgress: progressEvent => {
      if (!progressEvent.total) {
        return
      }

      const progress = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      )

      onProgress?.(progress)
    }
  })
}
