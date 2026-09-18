import type { Metadata } from "next";
import Image from "next/image";
import { ContinueStrip } from "@/components/continue-strip";
import { Reveal } from "@/components/reveal";
import { StatsCounter } from "@/components/stats-counter";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { getPublicContent } from "@/lib/content";
import { requireSiteUnlock } from "@/lib/site-lock";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Real Estate",
};

const audiences = [
  {
    title: "Buyers",
    copy: "Prince opens access before the world sees the listing, matching curated inventory across five cities. Whether a first investment or a family compound, he moves with intention to secure the right match.",
  },
  {
    title: "Investors",
    copy: "Prince scans broadly and moves with precision; every acquisition is personally considered. The relationship extends across deals, across cities, across time.",
  },
  {
    title: "Young Professionals",
    copy: "Prince guides clients early in their trajectory across each milestone: first rental, first buy, first upgrade. The relationship compounds with the portfolio.",
  },
  {
    title: "Sellers",
    copy: "Prince enters a sale with an intuition already formed; identifying high value with aligned sensibility. Sellers access a suite of elevated marketing assets: branded floor plans, video, drone, photography.",
  },
  {
    title: "Families",
    copy: "As a first-generation Pakistani-American, Prince crosses borders, timelines, and cultures in every multigenerational transaction.",
  },
];

export default async function AdvisoryPage() {
  await requireSiteUnlock();
  const { quotes } = await getPublicContent();

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
          <p className="text-center font-display text-[15px] uppercase text-brown md:text-left">
            The real estate
          </p>
          <h1 className="mt-4 text-center font-serif text-[clamp(1.7rem,4.6vw,3.05rem)] uppercase leading-[0.95] tracking-tight text-brown md:text-left">
            Advisory that
            <br />
            seals a legacy.
          </h1>
          <div className="mx-auto mt-10 max-w-xl space-y-6 text-center text-[1rem] leading-[1.8] text-brown md:mx-0 md:text-left md:text-[1.05rem]">
            <p>
              As a PRODIGY at OFFICIAL, Prince built the operational playbook he
              now runs independently.
            </p>
            <p>
              What he carried out of OFFICIAL wasn&apos;t a résumé, but a
              structure. He built the team, the process, the architecture of a
              practice at the most elevated segment of the market. Leaving
              OFFICIAL to found his own advisory, he carried with him the
              network and the know-how to move at a standard that stands apart.
            </p>
            <p>
              Now, at Prince Hassan Group, he moves with the values instilled
              through his personal lineage, to guide his clients in shaping a
              longer arc.
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
          <p className="font-serif text-base uppercase text-brown">
            Offerings &amp; Services
          </p>
          <h2 className="mt-4 font-serif text-[clamp(1.7rem,5vw,2.5rem)] uppercase leading-[0.95] text-brown">
            Buying.
            <br />
            Selling.
            <br />
            Rentals.
            <br />
            Advisory.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-[1rem] leading-[1.8] text-brown md:mx-0 md:text-[1.05rem]">
            Prince leads the full timeline of a real estate relationship: from a
            young professional&apos;s first apartment, to a family&apos;s
            expansion of a real estate portfolio. Every engagement is met with
            the same quality of care: personal touch and focused attention
            underpin Prince&apos;s strategic vision.
          </p>
        </Reveal>
      </section>

      <section className="px-5 py-20 md:px-12 md:py-28">
        <Reveal>
          <h2 className="mx-auto max-w-4xl text-center font-serif text-[clamp(1.55rem,4vw,2.65rem)] uppercase leading-[0.95] tracking-tight text-brown">
            In a room full of agents
            <br />
            chasing the next,
            <br />
            Prince is tracing the deal.
          </h2>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1680px] px-5 pb-24 md:px-12 md:pb-32">
        <Reveal>
          <h2 className="font-serif text-[clamp(1.7rem,5vw,2.5rem)] uppercase text-brown">
            The Advisory
          </h2>
          <p className="mt-5 max-w-md text-[1rem] leading-[1.8] text-brown md:text-[1.05rem]">
            While every client arrives with a different frame, Prince arrives
            with a singular intention: to seal a legacy.
          </p>
        </Reveal>
        <div className="mt-10 grid items-start gap-12 md:mt-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          <Reveal>
            <Image
              src="/images/advisory/vardarious.webp"
              alt=""
              width={1200}
              height={1600}
              className="aspect-[3/4] w-full object-cover"
            />
          </Reveal>
          <div className="space-y-12">
            {audiences.map((item, i) => (
              <Reveal key={item.title} delay={i * 40}>
                <p className="font-serif text-lg uppercase text-brown">
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

      {quotes.length ? (
        <section className="px-5 py-16 md:px-12 md:py-24">
          <Reveal>
            <p className="text-center font-serif text-base uppercase text-brown">
              Overheard
            </p>
            <h2 className="mt-3 text-center font-serif text-[clamp(2rem,7vw,3.35rem)] uppercase tracking-tight text-brown">
              On Prince—
            </h2>
          </Reveal>
          <div className="mt-14">
            <TestimonialCarousel quotes={quotes} />
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-[1680px] px-5 py-20 md:px-12 md:py-28">
        <div className="grid gap-16 md:grid-cols-2 md:grid-rows-[auto_auto_1fr_auto] md:gap-x-20 md:gap-y-0">
          <Reveal className="flex flex-col text-center md:col-start-1 md:row-span-4 md:grid md:grid-rows-subgrid md:text-left">
            <Image
              src="/images/advisory/cottonbro.webp"
              alt=""
              width={900}
              height={1100}
              className="mx-auto mb-10 aspect-[4/5] w-[78%] object-cover md:mx-0 md:w-[82%]"
            />
            <h3 className="font-serif text-[clamp(1.45rem,4vw,1.85rem)] uppercase text-brown">
              The Inner Circle
            </h3>
            <div>
              <p className="mt-6 leading-[1.8] text-brown">
                Twelve families whose needs are globally met. Prince tends their
                real estate the way a good son tends the family home — before
                anything is needed, before anything breaks, before the question
                forms. The relationship begins before the first transaction, and
                continues long after the last.
              </p>
              <p className="mt-5 leading-[1.8] text-brown">
                By introduction only. Availability discussed directly.
              </p>
            </div>
            <details className="group mt-8 border-t border-brown/20 pt-4">
              <summary className="min-h-11 cursor-pointer list-none py-2 font-serif text-lg uppercase text-brown [&::-webkit-details-marker]:hidden">
                Details
                <span className="ml-2 inline-block transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <dl className="mt-6 space-y-5 text-[1.02rem] leading-relaxed text-brown">
                <div>
                  <dt className="font-medium uppercase">
                    Capacity
                  </dt>
                  <dd className="text-brown/75">
                    Twelve families. Currently accepting two.
                  </dd>
                </div>
                <div>
                  <dt className="font-medium uppercase">
                    Access
                  </dt>
                  <dd className="text-brown/75">
                    By introduction from an existing member.
                  </dd>
                </div>
                <div>
                  <dt className="font-medium uppercase">
                    Includes
                  </dt>
                  <dd className="text-brown/75">
                    Annual review · Off-market priority · Experiences · Direct
                    line
                  </dd>
                </div>
                <div>
                  <dt className="font-medium uppercase">
                    Structure
                  </dt>
                  <dd className="text-brown/75">
                    Annual retainer. Discussed in conversation.
                  </dd>
                </div>
              </dl>
            </details>
          </Reveal>

          <Reveal
            delay={120}
            className="flex flex-col text-center md:col-start-2 md:row-span-4 md:grid md:grid-rows-subgrid md:text-left"
          >
            <Image
              src="/images/advisory/ushindi.webp"
              alt=""
              width={900}
              height={1100}
              className="mx-auto mb-10 aspect-[4/5] w-[78%] object-cover md:mx-0 md:w-[82%]"
            />
            <h3 className="font-serif text-[clamp(1.45rem,4vw,1.85rem)] uppercase text-brown">
              Portfolio Partnership
            </h3>
            <div>
              <p className="mt-6 leading-[1.8] text-brown">
                For investors scanning a broader horizon, Prince serves as a
                retained strategic partner, mapping markets, timing
                acquisitions, and maintaining the relationships that make the
                right opportunities visible before they surface. The goal is not
                just the next acquisition, but the portfolio that still holds a
                generation from now.
              </p>
              <p className="mt-5 leading-[1.8] text-brown">
                By introduction only. Availability discussed directly.
              </p>
            </div>
            <details className="group mt-8 border-t border-brown/20 pt-4">
              <summary className="min-h-11 cursor-pointer list-none py-2 font-serif text-lg uppercase text-brown [&::-webkit-details-marker]:hidden">
                Details
                <span className="ml-2 inline-block transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <dl className="mt-6 space-y-5 text-[1.02rem] leading-relaxed text-brown">
                <div>
                  <dt className="font-medium uppercase">
                    Capacity
                  </dt>
                  <dd className="text-brown/75">
                    Selected based on alignment of vision.
                  </dd>
                </div>
                <div>
                  <dt className="font-medium uppercase">
                    Access
                  </dt>
                  <dd className="text-brown/75">
                    By introduction or direct inquiry.
                  </dd>
                </div>
                <div>
                  <dt className="font-medium uppercase">
                    Includes
                  </dt>
                  <dd className="text-brown/75">
                    Market strategy · Portfolio mapping · Multi-city advisory ·
                    Investor relationships · Counsel in finance and property
                    law.
                  </dd>
                </div>
                <div>
                  <dt className="font-medium uppercase">
                    Structure
                  </dt>
                  <dd className="text-brown/75">
                    Project-based or retained. Discussed directly.
                  </dd>
                </div>
              </dl>
            </details>
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
