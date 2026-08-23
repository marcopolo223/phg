"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative h-svh min-h-[32rem] w-full overflow-hidden bg-[#1a1814]">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-5 text-center fade-up">
        <Image
          src="/brand/hero-ph.png"
          alt="Prince Hassan Group"
          width={778}
          height={973}
          priority
          className="h-[min(52vw,430px)] w-auto mix-blend-screen"
        />
        <Image
          src="/brand/positioning.png"
          alt="The real estate advisory that seals a legacy"
          width={1500}
          height={209}
          priority
          className="mt-10 w-[min(96vw,920px)] mix-blend-screen md:mt-14"
        />
      </div>
    </section>
  );
}
