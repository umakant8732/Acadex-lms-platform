import { mkdir } from 'node:fs/promises'
import path from 'node:path'

// Creates local temp folder for one transcode job.
export const createTranscodeWorkDir = async ({ lectureId, videoAssetId }) => {
  const workDir = path.join(
    process.cwd(),
    'temp',
    'lecture-transcode',
    `${lectureId}-${videoAssetId}`
  )

  const inputFilePath = path.join(workDir, 'original.mp4')
  const hlsOutputDir = path.join(workDir, 'hls')

  await mkdir(hlsOutputDir, { recursive: true })

  return {
    workDir,
    inputFilePath,
    hlsOutputDir
  }
}
