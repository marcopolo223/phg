"use client";

import type { ReactNode } from "react";
import { useDragMarquee } from "@/lib/use-drag-marquee";

const quotes: { name: string; body: ReactNode }[] = [
  {
    name: "Aman · Buyer · Miami / Fort Lauderdale",
    body: (
      <>
        Prince has been with me since I rented my first apartment. Years later
        he is still the person I call — for the next home, and for rooms far
        outside real estate.{" "}
        <em className="italic">Whatever negotiation I enter, I call him first.</em>
      </>
    ),
  },
  {
    name: "Seth · Investor · Family Office · Global",
    body: (
      <>
        I met Prince in college, when he was already closing faster than the
        rest of us could see the opening.{" "}
        <em className="italic">
          That instinct is why my family asked him to help expand our legacy.
        </em>
      </>
    ),
  },
  {
    name: "Yasmeen · Seller · Fort Lauderdale",
    body: (
      <>
        He understood what the house meant before I found the words.{" "}
        <em className="italic">
          After the sale, my mother still invites him to lunch.
        </em>
      </>
    ),
  },
];

function QuoteCard({ item }: { item: (typeof quotes)[number] }) {
  return (
    <article className="testimonial-card">
      <blockquote>
        <p className="font-serif text-[1.25rem] leading-[1.75] text-brown md:text-[1.5rem] md:leading-[1.8]">
          “{item.body}”
        </p>
        <footer className="mt-8 font-display text-[13px] uppercase tracking-[0.16em] text-brown/80 md:mt-10 md:text-[14px]">
          {item.name}
        </footer>
      </blockquote>
    </article>
  );
}

export function TestimonialCarousel() {
  const marquee = useDragMarquee(28);

  return (
    <div
      ref={marquee.viewportRef}
      className="testimonial-marquee"
      role="region"
      aria-label="Client notes"
      onPointerDown={marquee.onPointerDown}
      onPointerMove={marquee.onPointerMove}
      onPointerUp={marquee.onPointerUp}
      onPointerCancel={marquee.onPointerUp}
    >
      <div ref={marquee.trackRef} className="testimonial-marquee-track">
        <div ref={marquee.groupRef} className="flex shrink-0 gap-5">
          {quotes.map((item) => (
            <QuoteCard key={`a-${item.name}`} item={item} />
          ))}
        </div>
        <div className="flex shrink-0 gap-5" aria-hidden="true">
          {quotes.map((item) => (
            <QuoteCard key={`b-${item.name}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
