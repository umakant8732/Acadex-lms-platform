import { useEffect, useRef } from 'react'
import Hls from 'hls.js'
import { FiX } from 'react-icons/fi'

// Adds CloudFront signed query to unsigned HLS file requests.
// Master playlist already comes signed, but segment requests need same access.
const appendSignedQuery = ({ url, signedQuery }) => {
  const alreadySigned =
    url.includes('Policy=') ||
    url.includes('Signature=') ||
    url.includes('Key-Pair-Id=')

  if (!signedQuery || alreadySigned) {
    return url
  }

  return `${url}${url.includes('?') ? '&' : '?'}${signedQuery}`
}

const LecturePreviewPlayer = ({ playbackAccess, onClose, onPlaybackError }) => {
  const videoRef = useRef(null)
  const hasReportedErrorRef = useRef(false)

  useEffect(() => {
    // Video element is controlled by HLS.js after playback data is ready.
    const videoElement = videoRef.current
    const playback = playbackAccess?.playback
    hasReportedErrorRef.current = false

    if (!videoElement || !playback?.playlistUrl) {
      return
    }

    // Reports only first playback error so teacher does not get toast spam.
    const reportPlaybackError = message => {
      if (hasReportedErrorRef.current) {
        return
      }

      hasReportedErrorRef.current = true
      onPlaybackError?.(message)
    }

    if (Hls.isSupported()) {
      // Chrome/Edge need HLS.js because they do not reliably play m3u8 natively.
      const hls = new Hls({
        xhrSetup: xhr => {
          const originalOpen = xhr.open

          // HLS.js requests playlist and segments internally.
          // We intercept each request and attach signed query to unsigned segment URLs.
          xhr.open = function (method, url, async, user, password) {
            const signedUrl = appendSignedQuery({
              url,
              signedQuery: playback.signedQuery
            })

            return originalOpen.call(
              this,
              method,
              signedUrl,
              async,
              user,
              password
            )
          }
        }
      })

      // Load signed master playlist and attach stream to video tag.
      hls.loadSource(playback.playlistUrl)
      hls.attachMedia(videoElement)

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (!data?.fatal) {
          return
        }

        reportPlaybackError('Unable to play lecture video. Please try again.')
      })

      return () => {
        // Destroy HLS instance so old network requests/listeners are cleaned up.
        hls.destroy()
      }
    }

    if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari can play HLS directly, so HLS.js is not needed there.
      videoElement.src = playback.playlistUrl

      videoElement.onerror = () => {
        reportPlaybackError('Unable to play lecture video. Please try again.')
      }
    }
  }, [playbackAccess, onPlaybackError])

  if (!playbackAccess) {
    return null
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4'>
      <div className='w-full max-w-5xl border border-white/10 bg-black'>
        <div className='flex items-center justify-between border-b border-white/10 px-4 py-3'>
          <p className='text-sm font-medium text-white'>Lecture Preview</p>

          <button
            type='button'
            onClick={onClose}
            className='btn btn-ghost btn-sm rounded-none text-white hover:bg-white/10'
          >
            <FiX />
          </button>
        </div>

        <video
          ref={videoRef}
          controls
          className='aspect-video w-full bg-black'
        />
      </div>
    </div>
  )
}

export default LecturePreviewPlayer
