import axios from 'axios'

// Uploads image file directly to S3 using presigned URL.
export const uploadCourseThumbnailToS3Service = async (
  presignedUploadUrl,
  file
) => {
  return await axios.put(presignedUploadUrl, file, {
    headers: {
      'Content-Type': file.type
    }
  })
}
