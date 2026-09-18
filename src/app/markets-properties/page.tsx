import type { Metadata } from "next";
import Image from "next/image";
import { ContinueStrip } from "@/components/continue-strip";
import { MarketsGrid } from "@/components/markets-grid";
import { PastTransactionsMarquee } from "@/components/past-transactions-marquee";
import { Reveal } from "@/components/reveal";
import { getPublicContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Markets & Properties",
};

export default async function MarketsPage() {
  const { markets, deals } = await getPublicContent();

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
          <h1 className="w-full text-center font-serif text-[clamp(1.85rem,6vw,3.5rem)] uppercase leading-[0.95] tracking-tight text-brown md:text-left">
            Markets that
            <br />
            make
            <br />
            a mark.
          </h1>
        </Reveal>
        <Reveal delay={140} className="mkt-hero-body flex items-start">
          <p className="mx-auto max-w-xl text-center text-[1.02rem] leading-[1.75] text-brown md:mx-0 md:text-left md:text-[1.12rem]">
            Prince arrives at a transaction from the inside: the neighborhoods,
            the buildings, the families who have been here long enough to know
            the difference between flash and what will last.
          </p>
        </Reveal>
      </section>

      <MarketsGrid markets={markets} />

      {deals.length ? (
        <section className="pb-20 pt-10 md:pb-28 md:pt-16">
          <Reveal>
            <p className="mb-10 text-center font-display text-[18px] uppercase tracking-[0.02em] text-brown md:mb-12 md:text-[20px] lg:text-[22px]">
              Past transactions
            </p>
          </Reveal>
          <PastTransactionsMarquee deals={deals} />
        </section>
      ) : null}

      <ContinueStrip
        kicker="Continue"
        href="/contact-prince"
        label="Contact Prince"
      />
    </>
  );
}
