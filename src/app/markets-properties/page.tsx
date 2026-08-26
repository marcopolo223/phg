import type { Metadata } from "next";
import Image from "next/image";
import { ContinueStrip } from "@/components/continue-strip";
import { PastTransactionsMarquee } from "@/components/past-transactions-marquee";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Markets & Properties",
};

const markets = [
  {
    name: "MIAMI",
    image: "/images/markets/miami.jpg",
    copy: "The seat of Prince's own lineage, and the city that shaped his name.",
    photoClass: "mkt-miami-photo",
    nameClass: "mkt-miami-name",
    copyClass: "mkt-miami-copy",
  },
  {
    name: "FORT LAUDERDALE",
    image: "/images/markets/fort-lauderdale.jpg",
    copy: "Here the oldest families keep quiet counsel, and Prince has been in the room for years.",
    photoClass: "mkt-ftl-photo",
    nameClass: "mkt-ftl-name",
    copyClass: "mkt-ftl-copy",
  },
  {
    name: "MANHATTAN",
    image: "/images/markets/manhattan.jpg",
    copy: "Where penthouses open the long horizon of legacy.",
    photoClass: "mkt-man-photo",
    nameClass: "mkt-man-name",
    copyClass: "mkt-man-copy",
  },
  {
    name: "PALM BEACH",
    image: "/images/markets/palm-beach.jpg",
    copy: "Where inherited prestige meets the next chapter of the name.",
    photoClass: "mkt-pb-photo",
    nameClass: "mkt-pb-name",
    copyClass: "mkt-pb-copy",
  },
  {
    name: "HAMPTONS",
    image: "/images/markets/hamptons.jpg",
    copy: "The next shoreline. Arriving 2027.",
    photoClass: "mkt-hp-photo",
    nameClass: "mkt-hp-name",
    copyClass: "mkt-hp-copy",
  },
  {
    name: "HOUSTON",
    image: "/images/markets/houston.jpg",
    copy: "The next skyline. Spring 2026.",
    photoClass: "mkt-hou-photo",
    nameClass: "mkt-hou-name",
    copyClass: "mkt-hou-copy",
  },
  {
    name: "ORLANDO",
    image: "/images/markets/orlando.jpg",
    copy: "Where Florida's private lakes keep their own estates.",
    photoClass: "mkt-nj-photo",
    nameClass: "mkt-nj-name",
    copyClass: "mkt-nj-copy",
  },
];

const deals = [
  {
    title: "300 S Pointe Dr #2801 — $4,500,000",
    copy: "Held off-market at Miami's southernmost point. City, bay, and ocean in one turn.",
    image: "/images/properties/south-pointe.jpg",
  },
  {
    title: "Missoni Baia #5201 — $3,250,000",
    copy: "Three closings in this building. The bay, the architecture, and a clientele that stays.",
    image: "/images/properties/missoni-5201.jpg",
  },
  {
    title: "Windermere FL — $3,150,000",
    copy: "Nearly an acre, inside a gated community that does not need to introduce itself.",
    image: "/images/properties/windermere.jpg",
  },
  {
    title: "Fort Lauderdale / Harbor Inlet — $2,800,000",
    copy: "A private inlet. Minutes from Harbor Beach, and the coastline that holds Fort Lauderdale.",
    image: "/images/properties/harbor-inlet.jpg",
  },
  {
    title: "695 1st Ave — $2,335,000",
    copy: "Richard Meier's first black-glass tower, twenty-eighth floor. The Manhattan skyline, unobstructed.",
    image: "/images/properties/first-ave.jpg",
  },
  {
    title: "425 NW 119th Ave — $2,000,000",
    copy: "Five bedrooms on three-quarters of an acre. A compound built to be lived in — not merely held.",
    image: "/images/properties/425-nw.jpg",
  },
  {
    title: "Missoni Baia #1703 — $1,880,000",
    copy: "A second chapter in the same building. Proof the first was not an accident.",
    image: "/images/properties/missoni-1703.jpeg",
  },
  {
    title: "1010 Brickell #2505 — $1,400,000",
    copy: "Brickell held at the right altitude. A first address with room to grow the name.",
    image: "/images/properties/1010-brickell.jpg",
  },
];

export default function MarketsPage() {
  return (
    <>
      <section className="mkt-hero pt-16 md:pt-24">
        <Reveal className="mkt-hero-photo relative overflow-hidden">
          <Image
            src="/images/markets/hero.jpg"
            alt=""
            width={1600}
            height={2000}
            priority
            className="absolute inset-0 h-full w-full object-cover"
            sizes="(min-width: 768px) 42vw, 92vw"
          />
        </Reveal>
        <Reveal delay={80} className="mkt-hero-title flex items-end">
          <h1 className="w-full text-center font-serif text-[clamp(2.4rem,11vw,5.8rem)] uppercase leading-[0.92] tracking-tight text-brown md:text-left">
            Markets that
            <br />
            make
            <br />
            a mark.
          </h1>
        </Reveal>
        <Reveal delay={140} className="mkt-hero-body flex items-start">
          <p className="mx-auto max-w-xl text-center text-[1.08rem] leading-[1.8] text-brown md:mx-0 md:text-left md:text-[1.35rem]">
            Prince arrives at a transaction from the inside: the neighborhoods,
            the buildings, the families who have been here long enough to know
            the difference between flash and what will last.
          </p>
        </Reveal>
      </section>

      <section className="mkt-grid">
        {markets.map((market, i) => (
          <Reveal
            key={market.name}
            delay={(i % 2) * 80}
            className={`mkt-photo ${market.photoClass}`}
          >
            <Image
              src={market.image}
              alt={market.name}
              width={1600}
              height={1100}
              className="absolute inset-0 h-full w-full object-cover"
              sizes="(min-width: 768px) 48vw, 92vw"
            />
          </Reveal>
        ))}
        {markets.map((market) => (
          <Reveal
            key={`${market.name}-name`}
            className={`mkt-name ${market.nameClass} flex items-end`}
          >
            <h2 className="w-full text-center font-display text-[clamp(1.7rem,8.4vw,5.2rem)] leading-none tracking-wide text-cream drop-shadow-[0_1px_12px_rgba(0,0,0,0.45)]">
              {market.name}
            </h2>
          </Reveal>
        ))}
        {markets.map((market) => (
          <Reveal
            key={`${market.name}-copy`}
            className={`mkt-copy ${market.copyClass} flex items-start`}
          >
            <p className="mx-auto max-w-[22rem] text-center text-[1.02rem] leading-[1.7] text-cream drop-shadow-[0_1px_10px_rgba(0,0,0,0.45)] md:text-[1.12rem]">
              {market.copy}
            </p>
          </Reveal>
        ))}
      </section>

      <section className="pb-20 pt-10 md:pb-28 md:pt-16">
        <Reveal>
          <p className="mb-10 text-center font-display text-[22px] uppercase tracking-[0.18em] text-brown md:mb-14 md:text-[28px] lg:text-[34px]">
            Past transactions
          </p>
        </Reveal>
        <PastTransactionsMarquee deals={deals} />
      </section>

      <ContinueStrip
        kicker="Continue"
        href="/contact-prince"
        label="Contact Prince"
      />
    </>
  );
}
