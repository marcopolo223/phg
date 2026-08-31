import Image from "next/image";
import { ContinueStrip } from "@/components/continue-strip";
import { HeroVideo } from "@/components/hero-video";
import { Reveal } from "@/components/reveal";

export default function HomePage() {
  return (
    <>
      <HeroVideo />

      <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-12 md:py-36">
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

        <div className="mt-16 grid items-start gap-12 md:mt-32 md:grid-cols-2 md:gap-x-16 md:gap-y-28 lg:gap-x-20">
          <Reveal className="order-2 md:order-1">
            <div>
              <p className="font-label text-[14px] tracking-[0.2em] text-[#8c735e] md:text-[15px]">
                Meet Prince:
              </p>
              <div className="mt-7 space-y-7 text-[1.05rem] leading-[1.9] text-brown md:text-[1.12rem]">
                <p>
                  Twenty-eight. Nearly a decade in the field. Close to{" "}
                  <em className="italic">$80 million</em> closed across Miami,
                  Fort Lauderdale, Manhattan, and the Hamptons.
                </p>
                <p>
                  He came up through an invitation-only track, working beside
                  founders as the practice expanded into the Hamptons, Aspen,
                  Manhattan, Miami, Orange County, and the Bahamas. The rooms
                  stayed with him. The method is now his own.
                </p>
                <p>
                  Before the industry had a title for him, he had already closed
                  more than 300 transactions at the University of Miami and led
                  a fourteen-person team by graduation.
                </p>
                <p>
                  Today the advisory is a private office: a select circle,
                  direct access, no handoffs — from South of Fifth oceanfront
                  to custom estates in Coral Gables, and the portfolios that
                  connect them.
                </p>
              </div>
              <p className="mt-12 text-[14px] tracking-[0.16em] uppercase text-brown-ink md:text-[15px]">
                Every deal is a seal in a larger legacy.
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
            <h2 className="text-center font-serif text-[clamp(2.05rem,8vw,6.4rem)] leading-[0.92] tracking-tight text-brown md:pl-8 md:text-left lg:pl-14">
              CLOSING DEALS,
              <br />
              OPENING DOORS.
            </h2>
          </Reveal>
        </div>
      </div>

      <section className="px-5 pb-20 md:px-12 md:pb-28">
        <Reveal>
          <Image
            src="/images/home/quotes.webp"
            alt=""
            width={240}
            height={160}
            className="mx-auto mb-10 h-20 w-auto object-contain md:h-24"
          />
          <p className="mx-auto max-w-[40rem] text-center font-serif text-[clamp(1.2rem,3.2vw,3.1rem)] leading-[1.35] tracking-[0.04em] uppercase text-brown md:max-w-[94vw]">
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

      <ContinueStrip
        kicker="Continue"
        href="/advisory"
        label="The Advisory"
      />
    </>
  );
}
