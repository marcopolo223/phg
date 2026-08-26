import type { Metadata } from "next";
import Image from "next/image";
import { ContinueStrip } from "@/components/continue-strip";
import { Reveal } from "@/components/reveal";
import { StatsCounter } from "@/components/stats-counter";
import { TestimonialCarousel } from "@/components/testimonial-carousel";

export const metadata: Metadata = {
  title: "Real Estate",
};

const audiences = [
  {
    title: "Buyers",
    copy: "Access before a listing is public. Inventory chosen across cities, then narrowed to the one that belongs.",
  },
  {
    title: "Investors",
    copy: "A wide scan. A precise move. Each acquisition is considered in person — and the relationship continues after it closes.",
  },
  {
    title: "Young Professionals",
    copy: "First rental. First purchase. First step up. The counsel compounds with the portfolio.",
  },
  {
    title: "Sellers",
    copy: "A point of view already formed: value, taste, and a marketing suite built to that standard — film, drone, branded plans.",
  },
  {
    title: "Families",
    copy: "Borders, languages, and generations in one conversation. The work is to keep the name intact as the map changes.",
  },
];

export default function AdvisoryPage() {
  return (
    <>
      <section className="mx-auto grid max-w-[1680px] items-center gap-12 px-5 pb-12 pt-10 md:grid-cols-2 md:gap-16 md:px-12 md:pb-10 md:pt-16 lg:gap-20">
        <Reveal>
          <Image
            src="/images/advisory/alisa.webp"
            alt=""
            width={1400}
            height={1800}
            className="mx-auto aspect-[3/4] w-[86%] object-cover md:mx-0 md:w-[80%]"
            priority
          />
        </Reveal>
        <Reveal delay={120}>
          <p className="text-center font-display text-[15px] uppercase tracking-[0.2em] text-brown md:text-left">
            The practice
          </p>
          <h1 className="mt-4 text-center font-serif text-[clamp(2.05rem,6.4vw,4.1rem)] uppercase leading-[0.95] tracking-tight text-brown md:text-left">
            Advisory built
            <br />
            to last.
          </h1>
          <div className="mx-auto mt-10 max-w-xl space-y-8 text-center text-[1.08rem] leading-[2] text-brown md:mx-0 md:text-left md:text-[1.12rem]">
            <p>
              Prince advises a small circle of families who think in{" "}
              <em className="italic">decades</em>, not listing cycles.
            </p>
            <p>
              The method was proven inside OFFICIAL&apos;s most selective
              track. He now runs it independently:{" "}
              <span className="underline decoration-brown/35 underline-offset-[0.22em]">
                direct access, no handoffs, a network that opens doors before
                they are advertised.
              </span>
            </p>
            <p>
              Background, language, and lineage are part of the work — so a
              first home and a multigenerational estate can be held with the
              same standard.
            </p>
          </div>
        </Reveal>
      </section>

      <StatsCounter />

      <section className="mx-auto grid max-w-[1680px] items-center gap-10 px-5 py-16 md:grid-cols-2 md:gap-16 md:px-12 md:py-24">
        <Reveal>
          <Image
            src="/images/advisory/merve.webp"
            alt=""
            width={1600}
            height={2000}
            className="aspect-[4/5] w-full object-cover"
          />
        </Reveal>
        <Reveal delay={80} className="text-center md:text-left">
          <p className="font-serif text-base uppercase tracking-[0.12em] text-brown">
            Offerings &amp; Services
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2.15rem,8vw,3.4rem)] uppercase leading-[0.95] text-brown">
            Buying.
            <br />
            Selling.
            <br />
            Rentals.
            <br />
            Advisory.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-[1.08rem] leading-[2] text-brown md:mx-0 md:text-[1.12rem]">
            One relationship, the full timeline — from a first apartment to a
            family&apos;s next chapter of land.{" "}
            <em className="italic">Care is the strategy, not a courtesy.</em>
          </p>
        </Reveal>
      </section>

      <section className="px-5 py-20 md:px-12 md:py-28">
        <Reveal>
          <p className="text-center font-display text-[13px] uppercase tracking-[0.2em] text-brown/70">
            The difference
          </p>
          <h2 className="mx-auto mt-5 max-w-4xl text-center font-serif text-[clamp(1.55rem,4.2vw,2.85rem)] leading-[1.28] tracking-tight text-brown">
            Most of the market is built around the next closing.
            <br className="hidden md:block" /> Prince is built around the next
            decade.
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-center text-[1.08rem] leading-[2] text-brown md:text-[1.12rem]">
            He advises as if the property must still matter to the person who
            inherits it. That is the standard — slower to enter, harder to
            copy, and why the work feels like counsel rather than a chase.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1680px] px-5 pb-24 md:px-12 md:pb-32">
        <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          <Reveal>
            <h2 className="font-serif text-[clamp(2.15rem,8vw,3.4rem)] uppercase text-brown">
              The Advisory
            </h2>
            <p className="mt-5 max-w-md text-[1.08rem] leading-[2] text-brown md:text-[1.12rem]">
              Clients arrive with different frames. Prince arrives with one
              intention: <em className="italic">to keep what lasts.</em>
            </p>
            <Image
              src="/images/advisory/vardarious.webp"
              alt=""
              width={1200}
              height={1600}
              className="mt-10 aspect-[3/4] w-full object-cover"
            />
          </Reveal>
          <div className="space-y-12 md:pt-4 lg:pt-10">
            {audiences.map((item, i) => (
              <Reveal key={item.title} delay={i * 40}>
                <p className="font-serif text-lg uppercase tracking-[0.08em] text-brown">
                  {item.title}
                </p>
                <p className="mt-3 max-w-lg leading-[1.95] text-brown">
                  {item.copy}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-12 md:py-24">
        <Reveal>
          <p className="text-center font-serif text-base uppercase tracking-[0.14em] text-brown">
            Overheard
          </p>
          <h2 className="mt-3 text-center font-serif text-[clamp(2.6rem,12vw,5.5rem)] uppercase tracking-tight text-brown">
            On Prince—
          </h2>
        </Reveal>
        <div className="mt-14">
          <TestimonialCarousel />
        </div>
      </section>

      <section className="mx-auto max-w-[1680px] px-5 py-20 md:px-12 md:py-28">
        <div className="grid items-stretch gap-16 md:grid-cols-2 md:gap-20">
          <Reveal className="flex h-full flex-col text-center md:text-left">
            <Image
              src="/images/advisory/cottonbro.webp"
              alt=""
              width={900}
              height={1100}
              className="mx-auto mb-10 aspect-[4/5] w-[78%] object-cover md:mx-0 md:w-[82%]"
            />
            <h3 className="font-serif text-[clamp(1.75rem,6vw,2.35rem)] uppercase text-brown">
              The Inner Circle
            </h3>
            <p className="mt-6 leading-[2] text-brown">
              Twelve families, attended worldwide. Prince tends the real estate
              the way a house is tended at home —{" "}
              <em className="italic">before the need appears.</em>
            </p>
            <p className="mt-5 leading-[2] text-brown">
              By introduction. Availability in conversation.
            </p>
            <div className="mt-auto">
              <details className="group mt-8 border-t border-brown/20 pt-4">
                <summary className="min-h-11 cursor-pointer list-none py-2 font-serif text-lg uppercase tracking-[0.12em] text-brown [&::-webkit-details-marker]:hidden">
                  Details
                  <span className="ml-2 inline-block transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <dl className="mt-6 space-y-5 text-[1.02rem] leading-relaxed text-brown">
                  <div>
                    <dt className="font-medium uppercase tracking-[0.08em]">
                      Capacity
                    </dt>
                    <dd className="text-brown/75">
                      Twelve families. Currently accepting two.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium uppercase tracking-[0.08em]">
                      Access
                    </dt>
                    <dd className="text-brown/75">
                      By introduction from an existing member.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium uppercase tracking-[0.08em]">
                      Includes
                    </dt>
                    <dd className="text-brown/75">
                      Annual review · Off-market priority · Experiences · Direct
                      line
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium uppercase tracking-[0.08em]">
                      Structure
                    </dt>
                    <dd className="text-brown/75">
                      Annual retainer. Discussed in conversation.
                    </dd>
                  </div>
                </dl>
              </details>
            </div>
          </Reveal>

          <Reveal delay={120} className="flex h-full flex-col text-center md:text-left">
            <Image
              src="/images/advisory/ushindi.webp"
              alt=""
              width={900}
              height={1100}
              className="mx-auto mb-10 aspect-[4/5] w-[78%] object-cover md:mx-0 md:w-[82%]"
            />
            <h3 className="font-serif text-[clamp(1.75rem,6vw,2.35rem)] uppercase text-brown">
              Portfolio Partnership
            </h3>
            <p className="mt-6 leading-[2] text-brown">
              For investors reading a longer map: markets, timing, and the
              rooms where the right asset appears{" "}
              <em className="italic">before it is announced.</em>
            </p>
            <p className="mt-5 leading-[2] text-brown">
              By introduction. Availability in conversation.
            </p>
            <div className="mt-auto">
              <details className="group mt-8 border-t border-brown/20 pt-4">
                <summary className="min-h-11 cursor-pointer list-none py-2 font-serif text-lg uppercase tracking-[0.12em] text-brown [&::-webkit-details-marker]:hidden">
                  Details
                  <span className="ml-2 inline-block transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <dl className="mt-6 space-y-5 text-[1.02rem] leading-relaxed text-brown">
                  <div>
                    <dt className="font-medium uppercase tracking-[0.08em]">
                      Capacity
                    </dt>
                    <dd className="text-brown/75">
                      Selected based on alignment of vision.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium uppercase tracking-[0.08em]">
                      Access
                    </dt>
                    <dd className="text-brown/75">
                      By introduction or direct inquiry.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium uppercase tracking-[0.08em]">
                      Includes
                    </dt>
                    <dd className="text-brown/75">
                      Market strategy · Portfolio mapping · Multi-city advisory ·
                      Investor relationships · Counsel in finance and property
                      law.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium uppercase tracking-[0.08em]">
                      Structure
                    </dt>
                    <dd className="text-brown/75">
                      Project-based or retained. Discussed directly.
                    </dd>
                  </div>
                </dl>
              </details>
            </div>
          </Reveal>
        </div>
      </section>

      <ContinueStrip
        kicker="Continue"
        href="/markets-properties"
        label="The Markets He Holds"
      />
    </>
  );
}
