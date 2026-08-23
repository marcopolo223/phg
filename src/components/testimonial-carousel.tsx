"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const quotes = [
  {
    quote:
      "Prince has been with me since I rented my first apartment. In the years following, I've worked with him from everything from upgrading that initial investment, and getting access to the world of horology. Beyond Real Estate, whatever negotiation I enter, I call him first.",
    name: "Aman · Buyer · Miami/Fort Lauderdale",
  },
  {
    quote:
      "I met Prince in college when he was closing rentals at rapid speed. The joke in our group was always, why didn't we do what Prince did? He saw the opening before anyone else. That's still true. That's why I asked him to support my family's legacy expansion.",
    name: "Seth · Investor · Family Office · Global",
  },
  {
    quote:
      "Prince knew things about my family before I said them out loud. His own story is similar to mine, so I didn't have to explain what was important in the deal. Since the sale of my family home, my mom still invites him to lunch.",
    name: "Yasmeen · Seller · Fort Lauderdale",
  },
];

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const fadeTimer = useRef<number>(0);

  const goTo = useCallback((next: number) => {
    window.clearTimeout(fadeTimer.current);
    setFade(false);
    fadeTimer.current = window.setTimeout(() => {
      setIndex((next + quotes.length) % quotes.length);
      setFade(true);
    }, 420);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = window.setInterval(() => {
      setFade(false);
      window.clearTimeout(fadeTimer.current);
      fadeTimer.current = window.setTimeout(() => {
        setIndex((current) => (current + 1) % quotes.length);
        setFade(true);
      }, 420);
    }, 6000);

    return () => {
      window.clearInterval(id);
      window.clearTimeout(fadeTimer.current);
    };
  }, []);

  const item = quotes[index];

  return (
    <div className="relative mx-auto max-w-4xl px-11 text-center sm:px-12 md:px-20">
      <button
        type="button"
        aria-label="Previous"
        className="absolute left-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center font-display text-3xl text-brown"
        onClick={() => goTo(index - 1)}
      >
        ‹
      </button>
      <blockquote
        className="transition-opacity duration-500 ease-out"
        style={{ opacity: fade ? 1 : 0 }}
      >
        <p className="font-serif text-2xl leading-snug text-brown md:text-3xl lg:text-[2.15rem]">
          “{item.quote}”
        </p>
        <footer className="mt-8 font-display text-[15px] uppercase tracking-[0.14em] text-brown">
          {item.name}
        </footer>
      </blockquote>
      <button
        type="button"
        aria-label="Next"
        className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center font-display text-3xl text-brown"
        onClick={() => goTo(index + 1)}
      >
        ›
      </button>
    </div>
  );
}
