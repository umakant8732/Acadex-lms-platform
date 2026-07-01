import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Hls from 'hls.js'

// Adds CloudFront signed query to unsigned HLS requests.
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

// Reusable empty state shell so all player states look consistent.
const PlayerState = ({ title, subtitle, actions = null }) => {
  return (
    <div className='overflow-hidden border border-black/10 bg-white'>
      <div className='flex aspect-video items-center justify-center bg-[#f6f6f6] px-6 text-center'>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <p className='text-base font-medium text-black'>{title}</p>
            <p className='text-sm text-black/55'>{subtitle}</p>
          </div>

          {actions && (
            <div className='flex flex-wrap justify-center gap-3'>{actions}</div>
          )}
        </div>
      </div>
    </div>
  )
}

const StudentLecturePlayer = ({
  course,
  lesson,
  playbackAccess,
  isPlaybackLoading,
  isLessonAccessible,
  previewActionPath,
  checkoutActionPath,
  onPlaybackError
}) => {
  const videoRef = useRef(null)
  const hasReportedErrorRef = useRef(false)

  useEffect(() => {
    const videoElement = videoRef.current
    const playback = playbackAccess?.playback
    hasReportedErrorRef.current = false

    if (!videoElement || !playback?.playlistUrl) {
      return
    }

    const reportPlaybackError = message => {
      if (hasReportedErrorRef.current) {
        return
      }

      hasReportedErrorRef.current = true
      onPlaybackError?.(message)
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        xhrSetup: xhr => {
          const originalOpen = xhr.open

          // HLS.js internally requests master file and segments.
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

      hls.loadSource(playback.playlistUrl)
      hls.attachMedia(videoElement)

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (!data?.fatal) {
          return
        }

        reportPlaybackError('Unable to play lecture video. Please try again.')
      })

      return () => {
        hls.destroy()
      }
    }

    if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      videoElement.src = playback.playlistUrl

      videoElement.onerror = () => {
        reportPlaybackError('Unable to play lecture video. Please try again.')
      }
    }
  }, [playbackAccess, onPlaybackError])

  if (!lesson) {
    return (
      <PlayerState
        title='No lesson available yet'
        subtitle='Preview is not available right now. Purchase the course to unlock all ready lessons.'
        actions={
          <Link
            to={checkoutActionPath}
            className='inline-flex h-11 items-center justify-center bg-black px-5 text-sm font-medium text-white transition hover:opacity-90'
          >
            Buy now to unlock
          </Link>
        }
      />
    )
  }

  if (!lesson.lecture) {
    return (
      <PlayerState
        title='No video uploaded yet'
        subtitle='This lesson exists in syllabus but the video is not uploaded yet.'
      />
    )
  }

  if (!lesson.lecture.isPlayable) {
    return (
      <PlayerState
        title={
          lesson.lecture.isPreview
            ? 'This preview is preparing'
            : 'This lesson is preparing'
        }
        subtitle='The lecture video is still processing. Please check again soon.'
      />
    )
  }

  if (!isLessonAccessible) {
    return (
      <PlayerState
        title='This lesson is locked'
        subtitle={
          previewActionPath
            ? 'Start with a free preview lesson or unlock the complete course to continue here.'
            : 'Purchase access is needed before this lesson can be played.'
        }
        actions={
          <div className='flex flex-wrap justify-center gap-3'>
            {previewActionPath && !lesson.lecture?.isPreview && (
              <Link
                to={previewActionPath}
                className='inline-flex h-11 items-center justify-center border border-black px-5 text-sm font-medium text-black transition hover:bg-black hover:text-white'
              >
                Watch Preview
              </Link>
            )}

            <Link
              to={checkoutActionPath}
              className='inline-flex h-11 items-center justify-center bg-black px-5 text-sm font-medium text-white transition hover:opacity-90'
            >
              Buy now to unlock
            </Link>
          </div>
        }
      />
    )
  }

  if (isPlaybackLoading) {
    return (
      <PlayerState
        title='Loading lecture playback...'
        subtitle='Please wait while we prepare the secure video stream.'
      />
    )
  }

  return (
    <section className='overflow-hidden border border-black/10 bg-white'>
      <div className='bg-black'>
        <video
          ref={videoRef}
          controls
          autoPlay
          playsInline
          className='aspect-video w-full bg-black'
        />
      </div>

      <div className='border-t border-black/10 px-5 py-4 lg:px-6'>
        <div className='flex flex-wrap items-start justify-between gap-3'>
          <div className='min-w-0'>
            <p className='text-xs font-medium uppercase tracking-[0.18em] text-black/45'>
              {lesson.sectionTitle}
            </p>

            <h2 className='mt-2 text-xl font-semibold tracking-tight text-black lg:text-2xl'>
              {lesson.title}
            </h2>
          </div>

          {lesson.lecture?.isPreview && (
            <span className='border border-sky-200 bg-sky-50 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-sky-700'>
              Preview
            </span>
          )}
        </div>

        <p className='mt-3 text-sm leading-7 text-black/60'>
          {course?.subtitle ||
            course?.description ||
            'Continue learning lesson by lesson.'}
        </p>
      </div>
    </section>
  )
}

export default StudentLecturePlayer
