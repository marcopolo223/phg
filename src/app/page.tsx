import Image from "next/image";
import { HeroVideo } from "@/components/hero-video";
import { Reveal } from "@/components/reveal";

export default function HomePage() {
  return (
    <>
      <HeroVideo />

      <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-12 md:py-36">
        <Reveal>
          <h1 className="mx-auto text-center font-serif text-[clamp(1.75rem,4.4vw,4.5rem)] leading-[0.92] tracking-tight text-brown">
            SIX MARKETS.
            <br />
            FIVE LANGUAGES.
            <br />
            <span className="inline-block md:whitespace-nowrap">
              ONE MAKER OF LEGACIES.
            </span>
          </h1>
        </Reveal>

        <div className="mt-24 grid items-start gap-12 md:mt-32 md:grid-cols-2 md:gap-x-16 md:gap-y-28 lg:gap-x-20">
          <Reveal>
            <div>
              <p className="text-[14px] tracking-[0.2em] uppercase text-[#8c735e] md:text-[15px]">
                Meet Prince:
              </p>
              <div className="mt-7 space-y-6 text-[1.05rem] leading-[1.8] text-brown md:text-[1.15rem]">
                <p>
                  At twenty-eight, with nearly a decade in real estate, Prince
                  Hassan has closed close to $80 million in transactions across
                  Miami, Fort Lauderdale, Manhattan, and the Hamptons.
                </p>
                <p>
                  He joined OFFICIAL through PRODIGY, the firm’s invitation-only
                  track for high-performing agents, where he worked alongside
                  founders and senior leadership as the company expanded into key
                  luxury markets, including the Hamptons, Aspen, Manhattan, Miami,
                  Orange County, and the Bahamas.
                </p>
                <p>
                  Before formally entering the industry, he had already built what
                  most agents spend years trying to achieve—closing more than 300
                  transactions while still at the University of Miami Herbert
                  Business School and leading a fourteen-person team by
                  graduation.
                </p>
                <p>
                  Today, his advisory operates with a private-office model: a
                  select client base, direct access, and no handoffs. He has
                  closed at leading design-driven properties including Elysée,
                  Missoni, and Faena, and advises buyers, sellers, investors, and
                  multigenerational families on acquisitions ranging from South of
                  Fifth oceanfront condominiums to custom estates in Coral
                  Gables—and the portfolios that connect them.
                </p>
              </div>
              <p className="mt-12 text-[14px] tracking-[0.16em] uppercase text-brown-ink md:text-[15px]">
                For Prince, every deal is a seal in a larger legacy.
              </p>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <Image
              src="/images/home/prince-portrait.webp"
              alt="Prince Hassan"
              width={1400}
              height={1750}
              className="aspect-[4/5] w-full object-cover"
            />
          </Reveal>

          <Reveal>
            <Image
              src="/images/home/graphic.webp"
              alt=""
              width={1800}
              height={2250}
              className="aspect-[4/5] w-full object-cover"
            />
          </Reveal>
          <Reveal delay={160} className="self-center">
            <h2 className="font-serif text-[clamp(2.15rem,8vw,6.4rem)] leading-[0.92] tracking-tight text-brown md:pl-8 lg:pl-14">
              CLOSING DEALS,
              <br />
              OPENING DOORS.
            </h2>
          </Reveal>
        </div>
      </div>

      <section className="px-5 pb-28 md:px-12 md:pb-40">
        <Reveal>
          <Image
            src="/images/home/quotes.webp"
            alt=""
            width={240}
            height={160}
            className="mx-auto mb-10 h-20 w-auto object-contain md:h-24"
          />
          <p className="mx-auto max-w-[40rem] text-center font-serif text-[clamp(1.2rem,3.2vw,3.1rem)] leading-[1.28] tracking-[0.04em] uppercase text-brown md:max-w-[94vw]">
            <span className="md:block md:whitespace-nowrap">
              What my lineage built across oceans,
            </span>{" "}
            <span className="md:block md:whitespace-nowrap">
              I&apos;m continuing — one property, one
            </span>{" "}
            <span className="md:block md:whitespace-nowrap">
              family at a time.
            </span>
          </p>
        </Reveal>
      </section>
    </>
  );
}
