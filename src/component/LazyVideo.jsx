import { useEffect, useRef } from 'react';

/**
 * Viewport-aware video: renders its poster immediately, fetches only metadata,
 * and plays/pauses based on visibility so off-screen videos never decode.
 * Replaces raw autoplay <video> elements that all decode simultaneously.
 */
const LazyVideo = ({ src, poster, onCanPlay, onLoadedData, className, ...rest }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === 'undefined') return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let inView = false;

    const sync = () => {
      if (inView && !document.hidden && !reducedMotion) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    document.addEventListener('visibilitychange', sync);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      video.pause();
    };
  }, []);

  return (
    <video
      ref={(el) => {
        videoRef.current = el;
        if (el) el.muted = true;
      }}
      src={src}
      poster={poster}
      className={className}
      loop
      muted
      playsInline
      preload="metadata"
      onCanPlay={onCanPlay}
      onLoadedData={onLoadedData}
      {...rest}
    />
  );
};

export default LazyVideo;
