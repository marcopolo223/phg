"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

export type PastDeal = {
  title: string;
  copy: string;
  image: string;
};

export function PastTransactionsMarquee({ deals }: { deals: PastDeal[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const loopRef = useRef(0);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const axisRef = useRef<"none" | "x" | "y">("none");
  const frameRef = useRef(0);
  const lastTimeRef = useRef(0);

  const measure = useCallback(() => {
    const group = groupRef.current;
    const track = trackRef.current;
    if (!group || !track) return;
    const style = window.getComputedStyle(track);
    const gap = Number.parseFloat(style.columnGap || style.gap || "0") || 0;
    loopRef.current = group.offsetWidth + gap;
  }, []);

  useEffect(() => {
    measure();
    const track = trackRef.current;
    if (!track) return;

    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const speed = reduced ? 0 : 28;

    const tick = (now: number) => {
      const last = lastTimeRef.current || now;
      const dt = Math.min(0.05, (now - last) / 1000);
      lastTimeRef.current = now;

      const loop = loopRef.current;
      if (loop > 0 && !draggingRef.current && speed) {
        offsetRef.current -= speed * dt;
      }

      if (loop > 0) {
        while (offsetRef.current <= -loop) offsetRef.current += loop;
        while (offsetRef.current > 0) offsetRef.current -= loop;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    startXRef.current = event.clientX;
    startYRef.current = event.clientY;
    lastXRef.current = event.clientX;
    axisRef.current = "none";

    if (event.pointerType !== "touch") {
      draggingRef.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (axisRef.current === "none" && event.pointerType === "touch") {
      const dx = Math.abs(event.clientX - startXRef.current);
      const dy = Math.abs(event.clientY - startYRef.current);
      if (dx < 8 && dy < 8) return;
      if (dy > dx) {
        axisRef.current = "y";
        return;
      }
      axisRef.current = "x";
      draggingRef.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    if (axisRef.current === "y") return;
    if (!draggingRef.current) return;
    offsetRef.current += event.clientX - lastXRef.current;
    lastXRef.current = event.clientX;
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    axisRef.current = "none";
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  function renderCards(prefix: string) {
    return deals.map((deal) => (
      <article key={`${prefix}-${deal.title}`} className="past-marquee-card">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={deal.image}
            alt=""
            fill
            draggable={false}
            className="pointer-events-none object-cover"
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 42vw, 78vw"
          />
        </div>
        <h3 className="mt-[6%] max-w-[85%] font-serif text-[1.45rem] leading-snug text-brown md:text-[1.6rem]">
          {deal.title}
        </h3>
        <p className="mt-3 max-w-[85%] text-[1.05rem] leading-relaxed text-brown md:text-[1.12rem]">
          {deal.copy}
        </p>
      </article>
    ));
  }

  return (
    <div
      ref={viewportRef}
      className="past-marquee"
      role="region"
      aria-label="Past transactions"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div ref={trackRef} className="past-marquee-track">
        <div ref={groupRef} className="flex shrink-0 gap-5">
          {renderCards("a")}
        </div>
        <div className="flex shrink-0 gap-5" aria-hidden="true">
          {renderCards("b")}
        </div>
      </div>
    </div>
  );
}
