"use client";

import Image from "next/image";
import { useDragMarquee } from "@/lib/use-drag-marquee";

export type PastDeal = {
  title: string;
  copy: string;
  image: string;
};

export function PastTransactionsMarquee({
  deals,
  label = "Past transactions",
}: {
  deals: PastDeal[];
  label?: string;
}) {
  const marquee = useDragMarquee(28);

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
        <h3 className="mx-auto mt-[6%] max-w-[90%] font-display text-[1.15rem] leading-snug text-brown md:mx-0 md:text-[1.35rem]">
          {deal.title}
        </h3>
        <p className="mx-auto mt-3 max-w-[90%] text-[0.95rem] leading-relaxed text-brown md:mx-0 md:text-[1.02rem]">
          {deal.copy}
        </p>
      </article>
    ));
  }

  return (
    <div
      ref={marquee.viewportRef}
      className="past-marquee"
      role="region"
      aria-label={label}
      onPointerDown={marquee.onPointerDown}
      onPointerMove={marquee.onPointerMove}
      onPointerUp={marquee.onPointerUp}
      onPointerCancel={marquee.onPointerUp}
    >
      <div ref={marquee.trackRef} className="past-marquee-track">
        <div ref={marquee.groupRef} className="flex shrink-0 gap-5">
          {renderCards("a")}
        </div>
        <div className="flex shrink-0 gap-5" aria-hidden="true">
          {renderCards("b")}
        </div>
      </div>
    </div>
  );
}
