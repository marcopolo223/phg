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
    copy: "Where Prince meets past prestige with future-oriented vision.",
    photoClass: "mkt-pb-photo",
    nameClass: "mkt-pb-name",
    copyClass: "mkt-pb-copy",
  },
  {
    name: "HAMPTONS",
    image: "/images/markets/hamptons.jpg",
    copy: "The next shoreline, arriving 2027.",
    photoClass: "mkt-hp-photo",
    nameClass: "mkt-hp-name",
    copyClass: "mkt-hp-copy",
  },
  {
    name: "HOUSTON",
    image: "/images/markets/houston.jpg",
    copy: "Expanding the skyline, Spring 2026.",
    photoClass: "mkt-hou-photo",
    nameClass: "mkt-hou-name",
    copyClass: "mkt-hou-copy",
  },
  {
    name: "NEW JERSEY",
    image: "/images/markets/new-jersey.jpg",
    copy: "Select properties opening Summer 2027.",
    photoClass: "mkt-nj-photo",
    nameClass: "mkt-nj-name",
    copyClass: "mkt-nj-copy",
  },
];

const deals = [
  {
    title: "300 S Pointe Dr #2801 — $4,500,000",
    copy: "Off-market at Miami's southernmost point. 360° views of the city, bay, and ocean.",
    image: "/images/properties/south-pointe.jpg",
  },
  {
    title: "Missoni Baia #5201 — $3,250,000",
    copy: "Bay-view residences with world-class design. Three closings in this building, and counting.",
    image: "/images/properties/missoni-5201.jpg",
  },
  {
    title: "Windermere FL — $3,150,000",
    copy: "Nearly an acre inside one of Florida's most prestigious gated communities.",
    image: "/images/properties/windermere.jpg",
  },
  {
    title: "Fort Lauderdale / Harbor Inlet — $2,800,000",
    copy: "A private enclave minutes from Harbor Beach and Fort Lauderdale's best coastline.",
    image: "/images/properties/harbor-inlet.jpg",
  },
  {
    title: "695 1st Ave — $2,335,000",
    copy: "Richard Meier's first black-glass tower, 28th floor. Unobstructed Manhattan skyline views.",
    image: "/images/properties/first-ave.jpg",
  },
  {
    title: "425 NW 119th Ave — $2,000,000",
    copy: "Five-bedroom compound on three-quarters of an acre. Resort pool with grotto, tiki kitchen, basketball court, and putting green.",
    image: "/images/properties/425-nw.jpg",
  },
  {
    title: "Missoni Baia #1703 — $1,880,000",
    copy: "Another chapter in the same building — design, views, and a community worth staying in.",
    image: "/images/properties/missoni-1703.jpeg",
  },
  {
    title: "1010 Brickell #2505 — $1,400,000",
    copy: "A premier Brickell address for professionals and families, at the right entry point.",
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
          <h1 className="w-full text-center font-serif text-[clamp(2.4rem,11vw,5.8rem)] leading-[0.92] tracking-tight text-brown md:text-left">
            Markets that
            <br />
            make
            <br />
            a mark.
          </h1>
        </Reveal>
        <Reveal delay={140} className="mkt-hero-body flex items-start">
          <p className="mx-auto max-w-xl text-center text-[1.08rem] leading-[1.8] text-brown md:mx-0 md:text-left md:text-[1.35rem]">
            Prince arrives at transactions from the inside: the neighborhoods,
            the buildings, the families who&apos;ve been here long enough to
            know the difference between flash and what will last.
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
        label="Begin a conversation"
      />
    </>
  );
}
