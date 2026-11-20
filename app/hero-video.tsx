"use client";

import { useEffect, useRef } from "react";

const videoUrl = "https://www.pexels.com/download/video/34597340/";
const posterUrl = "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1600&q=75";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const source = video?.querySelector("source");
    if (!video || !source || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let loaded = false;
    const playWhenVisible = async () => {
      if (document.hidden) return;
      if (!loaded) {
        source.src = videoUrl;
        video.load();
        loaded = true;
      }

      try {
        await video.play();
      } catch (error) {
        console.warn("Hero video playback is unavailable; showing its poster instead.", error);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void playWhenVisible();
      else video.pause();
    }, { threshold: 0.01 });
    observer.observe(video);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
        return;
      }

      const bounds = video.getBoundingClientRect();
      if (bounds.bottom > 0 && bounds.top < window.innerHeight) void playWhenVisible();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      video.pause();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="hero-video"
      muted
      loop
      playsInline
      preload="none"
      poster={posterUrl}
      aria-label="Suasana kota modern"
    >
      <source data-src={videoUrl} type="video/mp4" />
    </video>
  );
}
