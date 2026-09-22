import Image from "next/image";
import { ContinueStrip } from "@/components/continue-strip";
import { HeroVideo } from "@/components/hero-video";
import { PastTransactionsMarquee } from "@/components/past-transactions-marquee";
import { Reveal } from "@/components/reveal";
import { getPublicContent } from "@/lib/content";
import { requireSiteUnlock } from "@/lib/site-lock";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await requireSiteUnlock();
  const { listings } = await getPublicContent();

  return (
    <>
      <HeroVideo />

      <div className="mx-auto max-w-[1680px] px-5 py-14 md:px-12 md:py-24">
        <Reveal>
          <h1 className="mx-auto text-center font-serif text-[clamp(1.55rem,3.4vw,3.25rem)] leading-[0.95] tracking-tight text-brown">
            SIX MARKETS.
            <br />
            FIVE LANGUAGES.
            <br />
            <span className="inline-block md:whitespace-nowrap">
              ONE MAKER OF LEGACIES.
            </span>
          </h1>
        </Reveal>

        <div className="mt-14 grid items-start gap-12 md:mt-20 md:grid-cols-2 md:gap-x-16 md:gap-y-20 lg:gap-x-20">
          <Reveal className="order-2 md:order-1">
            <div>
              <p className="font-label text-[14px] text-[#8c735e] md:text-[15px]">
                Meet Prince:
              </p>
              <div className="mt-7 space-y-6 text-[1rem] leading-[1.8] text-brown md:text-[1.05rem]">
                <p>
                  At twenty-eight, with nearly a decade in real estate, Prince
                  Hassan has closed close to $80 million in transactions across
                  Miami, Fort Lauderdale, Manhattan, and the Hamptons.
                </p>
                <p>
                  He joined OFFICIAL through PRODIGY, the firm&apos;s
                  invitation-only track for high-performing agents, where he
                  worked alongside founders and senior leadership as the company
                  expanded into key luxury markets, including the Hamptons,
                  Aspen, Manhattan, Miami, Orange County, and the Bahamas.
                </p>
                <p>
                  Before formally entering the industry, he had already built
                  what most agents spend years trying to achieve—closing more
                  than 300 transactions while still at the University of Miami
                  Herbert Business School and leading a fourteen-person team by
                  graduation.
                </p>
                <p>
                  Today, his advisory operates with a private-office model: a
                  select client base, direct access, and no handoffs. He has
                  closed at leading design-driven properties including Elysée,
                  Missoni, and Faena, and advises buyers, sellers, investors,
                  and multigenerational families on acquisitions ranging from
                  South of Fifth oceanfront condominiums to custom estates in
                  Coral Gables—and the portfolios that connect them.
                </p>
              </div>
              <p className="mt-12 font-display text-[14px] text-brown-ink md:text-[15px]">
                For Prince, every deal is a seal in a larger legacy.
              </p>
            </div>
          </Reveal>
          <Reveal delay={160} className="order-1 md:order-2">
            <Image
              src="/images/home/prince-portrait.webp"
              alt="Prince Hassan"
              width={1400}
              height={1750}
              className="aspect-[4/5] w-full object-cover"
            />
          </Reveal>

          <Reveal className="order-4 md:order-3">
            <Image
              src="/images/home/graphic.webp"
              alt=""
              width={1800}
              height={2250}
              className="aspect-[4/5] w-full object-cover"
            />
          </Reveal>
          <Reveal delay={160} className="order-3 self-center md:order-4">
            <h2 className="text-center font-serif text-[clamp(1.7rem,4.6vw,3.5rem)] leading-[0.95] tracking-tight text-brown md:pl-8 md:text-left lg:pl-14">
              CLOSING DEALS,
              <br />
              OPENING DOORS.
            </h2>
          </Reveal>
        </div>
      </div>

      <section className="px-5 pb-10 md:px-12 md:pb-16">
        <Reveal>
          <Image
            src="/images/home/quotes.webp"
            alt=""
            width={240}
            height={160}
            className="mx-auto mb-10 h-20 w-auto object-contain md:h-24"
          />
          <p className="mx-auto max-w-[40rem] text-center font-serif text-[clamp(1.15rem,2.15vw,2.05rem)] leading-[1.35] uppercase text-brown md:max-w-[58rem]">
            <span className="lg:block lg:whitespace-nowrap">
              What my lineage built across oceans,
            </span>{" "}
            <span className="lg:block lg:whitespace-nowrap">
              I&apos;m continuing — one property, one
            </span>{" "}
            <span className="lg:block lg:whitespace-nowrap">
              family at a time.
            </span>
          </p>
        </Reveal>
      </section>

      {listings.length ? (
        <section className="pb-20 pt-6 md:pb-28 md:pt-10">
          <Reveal>
            <p className="mb-10 text-center font-display text-[18px] uppercase text-brown md:mb-12 md:text-[20px] lg:text-[22px]">
              Current listings
            </p>
          </Reveal>
          <PastTransactionsMarquee deals={listings} label="Current listings" />
        </section>
      ) : null}

      <ContinueStrip
        kicker="Continue"
        href="/advisory"
        label="The Advisory"
      />
    </>
  );
}
