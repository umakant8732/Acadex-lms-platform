import ffmpeg from 'fluent-ffmpeg'
import ffprobeStatic from 'ffprobe-static'

// Configure ffprobe binary path for fluent-ffmpeg
ffmpeg.setFfprobePath(ffprobeStatic.path)

/**
 * Extracts duration, resolution, codec, and bitrate from a local video file using ffprobe.
 * @param {string} filePath - Absolute path to the local video file.
 * @returns {Promise<{duration: number, width: number, height: number, codec: string, bitrate: number}>}
 */
export const getVideoMetadata = async filePath => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        return reject(new Error(`Failed to probe video file: ${err.message}`))
      }

      const videoStream = metadata?.streams?.find(
        stream => stream.codec_type === 'video'
      )
      const format = metadata?.format || {}

      const duration = Number(format.duration || 0)
      const bitrate = Number(format.bit_rate || 0)
      const width = Number(videoStream?.width || 0)
      const height = Number(videoStream?.height || 0)
      const codec = videoStream?.codec_name || ''

      resolve({
        duration,
        width,
        height,
        codec,
        bitrate
      })
    })
  })
}
