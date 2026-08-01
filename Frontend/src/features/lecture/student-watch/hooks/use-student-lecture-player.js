import { useEffect, useRef } from "react";
import Hls from "hls.js";

// Adds CloudFront signed query to unsigned HLS requests.
const appendSignedQuery = ({ url, signedQuery }) => {
  const alreadySigned =
    url.includes("Policy=") ||
    url.includes("Signature=") ||
    url.includes("Key-Pair-Id=");

  if (!signedQuery || alreadySigned) {
    return url;
  }

  return `${url}${url.includes("?") ? "&" : "?"}${signedQuery}`;
};

/**
 * Custom hook to handle Hls.js configuration, native fallbacks, and lifecycle cleanups.
 */
export const useStudentLecturePlayer = ({ playbackAccess, onPlaybackError }) => {
  const videoRef = useRef(null);
  const hasReportedErrorRef = useRef(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    const playback = playbackAccess?.playback;
    hasReportedErrorRef.current = false;

    if (!videoElement || !playback?.playlistUrl) {
      return;
    }

    const reportPlaybackError = (message) => {
      if (hasReportedErrorRef.current) {
        return;
      }

      hasReportedErrorRef.current = true;
      onPlaybackError?.(message);
    };

    if (Hls.isSupported()) {
      const hls = new Hls({
        xhrSetup: (xhr) => {
          const originalOpen = xhr.open;

          xhr.open = function (method, url, async, user, password) {
            const signedUrl = appendSignedQuery({
              url: String(url),
              signedQuery: playback.signedQuery,
            });

            originalOpen.call(
              this,
              method,
              signedUrl,
              async ?? true,
              user ?? null,
              password ?? null,
            );
          };
        },
        fetchSetup: (context, initParams) => {
          const signedUrl = appendSignedQuery({
            url: context.url,
            signedQuery: playback.signedQuery,
          });

          return new Request(signedUrl, initParams);
        },
      });

      hls.loadSource(playback.playlistUrl);
      hls.attachMedia(videoElement);

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (!data.fatal) {
          return;
        }

        reportPlaybackError("Unable to play lecture video. Please try again.");
      });

      return () => {
        hls.destroy();
      };
    }

    if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
      videoElement.src = playback.playlistUrl;

      videoElement.onerror = () => {
        reportPlaybackError("Unable to play lecture video. Please try again.");
      };

      return () => {
        videoElement.onerror = null;
        videoElement.removeAttribute("src");
        videoElement.load();
      };
    }

    return undefined;
  }, [playbackAccess, onPlaybackError]);

  return {
    videoRef,
  };
};
