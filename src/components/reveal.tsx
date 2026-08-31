"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

function isInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return rect.bottom > 24 && rect.top < vh - 24;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "40px 0px -6% 0px" },
    );
    observer.observe(el);

    const check = () => {
      if (isInViewport(el)) {
        show();
        observer.disconnect();
        window.removeEventListener("scroll", check);
        window.removeEventListener("resize", check);
      }
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
