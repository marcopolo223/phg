"use client";

import { useCallback, useEffect, useRef, type PointerEvent } from "react";

export function useDragMarquee(speedPx = 28) {
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
    if (!group) return;
    const style = window.getComputedStyle(track ?? group);
    const gap = Number.parseFloat(style.columnGap || style.gap || "0") || 0;
    const width = group.scrollWidth || group.offsetWidth;
    if (width > 0) loopRef.current = width + gap;
  }, []);

  useEffect(() => {
    measure();
    const frame = window.requestAnimationFrame(measure);
    const group = groupRef.current;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    const ro = new ResizeObserver(measure);
    if (group) ro.observe(group);
    if (track) ro.observe(track);
    if (viewport) ro.observe(viewport);
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => {});

    const images = group?.querySelectorAll("img") ?? [];
    const onLoad = () => measure();
    images.forEach((img) => {
      if (!img.complete) img.addEventListener("load", onLoad);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("resize", measure);
      images.forEach((img) => img.removeEventListener("load", onLoad));
    };
  }, [measure]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const speed = reduced ? 0 : speedPx;

    const tick = (now: number) => {
      const last = lastTimeRef.current || now;
      const dt = Math.min(0.05, (now - last) / 1000);
      lastTimeRef.current = now;

      if (loopRef.current <= 0) measure();

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
  }, [measure, speedPx]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onTouchMove = (event: TouchEvent) => {
      if (draggingRef.current && axisRef.current === "x") {
        event.preventDefault();
      }
    };
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => el.removeEventListener("touchmove", onTouchMove);
  }, []);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    startXRef.current = event.clientX;
    startYRef.current = event.clientY;
    lastXRef.current = event.clientX;
    axisRef.current = "none";

    if (event.pointerType !== "touch") {
      draggingRef.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
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

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    axisRef.current = "none";
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return {
    viewportRef,
    trackRef,
    groupRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };
}
