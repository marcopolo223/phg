"use client";

import { QuoteText } from "@/components/quote-text";
import { useDragMarquee } from "@/lib/use-drag-marquee";
import type { Quote } from "@/lib/content";

function QuoteCard({ item }: { item: Quote }) {
  return (
    <article className="testimonial-card">
      <blockquote>
        <p className="font-quote text-[1.15rem] leading-[1.7] text-brown md:text-[1.28rem] md:leading-[1.75]">
          “<QuoteText text={item.body} />”
        </p>
        <footer className="mt-8 font-label text-[13px] tracking-[0.02em] text-brown/80 md:mt-10 md:text-[14px]">
          {item.name}
        </footer>
      </blockquote>
    </article>
  );
}

export function TestimonialCarousel({ quotes }: { quotes: Quote[] }) {
  const marquee = useDragMarquee(28);
  if (!quotes.length) return null;

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
            <QuoteCard key={`a-${item.id}`} item={item} />
          ))}
        </div>
        <div className="flex shrink-0 gap-5" aria-hidden="true">
          {quotes.map((item) => (
            <QuoteCard key={`b-${item.id}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
