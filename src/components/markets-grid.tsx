import Image from "next/image";
import { Reveal } from "@/components/reveal";
import type { Market } from "@/lib/content";

export function MarketsGrid({ markets }: { markets: Market[] }) {
  if (!markets.length) return null;

  return (
    <section className="mkt-stack">
      {markets.map((market, i) => {
        const wide = i === 0 || (markets.length % 2 === 0 && i === markets.length - 1);
        return (
          <Reveal
            key={market.id}
            delay={(i % 2) * 80}
            className={`mkt-card ${wide ? "mkt-card-wide" : ""}`}
          >
            <Image
              src={market.image}
              alt={market.name}
              fill
              className="object-cover"
              sizes={wide ? "96vw" : "(min-width: 768px) 48vw, 92vw"}
            />
            <div className="mkt-card-caption">
              <h2 className="font-display text-[clamp(1.45rem,6.8vw,2.1rem)] leading-[0.95] tracking-wide text-cream drop-shadow-[0_1px_12px_rgba(0,0,0,0.45)] md:text-[clamp(1.55rem,5.5vw,3.6rem)] md:leading-none">
                {market.name}
              </h2>
              <p className="mx-auto mt-3 max-w-[20rem] text-[0.95rem] leading-[1.45] text-cream drop-shadow-[0_1px_10px_rgba(0,0,0,0.45)] md:mt-4 md:max-w-[22rem] md:text-[1.12rem] md:leading-[1.7]">
                {market.copy}
              </p>
            </div>
          </Reveal>
        );
      })}
    </section>
  );
}
