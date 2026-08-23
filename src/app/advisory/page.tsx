import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { StatsCounter } from "@/components/stats-counter";
import { TestimonialCarousel } from "@/components/testimonial-carousel";

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

export default function AdvisoryPage() {
  return (
    <>
      <section className="mx-auto grid max-w-[1680px] items-center gap-10 px-5 pb-10 pt-10 md:grid-cols-2 md:gap-16 md:px-12 md:pb-6 md:pt-16 lg:gap-20">
        <Reveal>
          <Image
            src="/images/advisory/alisa.webp"
            alt=""
            width={1400}
            height={1800}
            className="aspect-[3/4] w-[86%] object-cover md:w-[80%]"
            priority
          />
        </Reveal>
        <Reveal delay={120}>
          <p className="font-display text-[15px] uppercase tracking-[0.2em] text-brown">
            The real estate
          </p>
          <h1 className="mt-4 font-serif text-[clamp(2.15rem,8vw,4.6rem)] uppercase leading-[0.95] tracking-tight text-brown">
            advisory that
            <br />
            seals a legacy.
          </h1>
          <div className="mt-8 max-w-xl space-y-5 text-[1.08rem] leading-[1.8] text-brown md:text-[1.15rem]">
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

      <Reveal>
        <StatsCounter />
      </Reveal>

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
        <Reveal delay={80}>
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
          <p className="mt-8 max-w-xl text-[1.08rem] leading-[1.8] text-brown md:text-[1.15rem]">
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
          <p className="mx-auto max-w-5xl text-center font-serif text-[clamp(1.45rem,5vw,3.4rem)] leading-[1.2] tracking-[0.04em] uppercase text-brown">
            In a room full of agents chasing the next, Prince is tracing the
            decade.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1680px] px-5 pb-24 md:px-12 md:pb-32">
        <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          <Reveal>
            <h2 className="font-serif text-[clamp(2.15rem,8vw,3.4rem)] uppercase text-brown">
              The Advisory
            </h2>
            <p className="mt-5 max-w-md text-[1.08rem] leading-[1.8] text-brown md:text-[1.15rem]">
              While every client arrives with a different frame, Prince arrives
              with a singular intention: to seal a legacy.
            </p>
            <Image
              src="/images/advisory/vardarious.webp"
              alt=""
              width={1200}
              height={1600}
              className="mt-10 aspect-[3/4] w-full object-cover"
            />
          </Reveal>
          <div className="space-y-10 md:pt-4 lg:pt-10">
            {audiences.map((item, i) => (
              <Reveal key={item.title} delay={i * 40}>
                <p className="font-serif text-lg uppercase tracking-[0.08em] text-brown">
                  {item.title}
                </p>
                <p className="mt-3 max-w-lg leading-[1.8] text-brown">
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
        <Reveal className="mt-14">
          <TestimonialCarousel />
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1680px] px-5 py-20 md:px-12 md:py-28">
        <div className="grid gap-16 md:grid-cols-2 md:gap-20">
          <Reveal>
            <Image
              src="/images/advisory/cottonbro.webp"
              alt=""
              width={900}
              height={1100}
              className="mb-10 aspect-[4/5] w-[42%] object-cover"
            />
            <h3 className="font-serif text-[clamp(1.75rem,6vw,2.35rem)] uppercase text-brown">
              The Inner Circle
            </h3>
            <p className="mt-5 leading-[1.8] text-brown">
              Twelve families whose needs are globally met. Prince tends their
              real estate the way a good son tends the family home — before
              anything is needed, before anything breaks, before the question
              forms. The relationship begins before the first transaction, and
              continues long after the last.
            </p>
            <p className="mt-4 leading-[1.8] text-brown">
              By introduction only. Availability discussed directly.
            </p>
            <details className="group mt-8 border-t border-brown/20 pt-4">
              <summary className="min-h-11 cursor-pointer list-none py-2 font-serif text-lg uppercase tracking-[0.12em] text-brown [&::-webkit-details-marker]:hidden">
                Details
                <span className="ml-2 inline-block transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <dl className="mt-6 space-y-5 text-[1.02rem] leading-relaxed text-brown">
                <div>
                  <dt className="font-medium uppercase tracking-[0.08em]">Capacity</dt>
                  <dd className="text-brown/75">
                    Twelve families. Currently accepting two.
                  </dd>
                </div>
                <div>
                  <dt className="font-medium uppercase tracking-[0.08em]">Access</dt>
                  <dd className="text-brown/75">
                    By introduction from an existing member.
                  </dd>
                </div>
                <div>
                  <dt className="font-medium uppercase tracking-[0.08em]">Includes</dt>
                  <dd className="text-brown/75">
                    Annual review · Off-market priority · Experiences · Direct
                    line
                  </dd>
                </div>
                <div>
                  <dt className="font-medium uppercase tracking-[0.08em]">Structure</dt>
                  <dd className="text-brown/75">
                    Annual retainer. Discussed in conversation.
                  </dd>
                </div>
              </dl>
            </details>
          </Reveal>

          <Reveal delay={120}>
            <Image
              src="/images/advisory/ushindi.webp"
              alt=""
              width={900}
              height={1100}
              className="mb-10 aspect-[4/5] w-[42%] object-cover"
            />
            <h3 className="font-serif text-[clamp(1.75rem,6vw,2.35rem)] uppercase text-brown">
              Portfolio Partnership
            </h3>
            <p className="mt-5 leading-[1.8] text-brown">
              For investors scanning a broader horizon, Prince serves as a
              retained strategic partner, mapping markets, timing acquisitions,
              and maintaining the relationships that make the right
              opportunities visible before they surface. The goal is not just
              the next acquisition, but the portfolio that still holds a
              generation from now.
            </p>
            <p className="mt-4 leading-[1.8] text-brown">
              By introduction only. Availability discussed directly.
            </p>
            <details className="group mt-8 border-t border-brown/20 pt-4">
              <summary className="min-h-11 cursor-pointer list-none py-2 font-serif text-lg uppercase tracking-[0.12em] text-brown [&::-webkit-details-marker]:hidden">
                Details
                <span className="ml-2 inline-block transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <dl className="mt-6 space-y-5 text-[1.02rem] leading-relaxed text-brown">
                <div>
                  <dt className="font-medium uppercase tracking-[0.08em]">Capacity</dt>
                  <dd className="text-brown/75">
                    Selected based on alignment of vision.
                  </dd>
                </div>
                <div>
                  <dt className="font-medium uppercase tracking-[0.08em]">Access</dt>
                  <dd className="text-brown/75">
                    By introduction or direct inquiry.
                  </dd>
                </div>
                <div>
                  <dt className="font-medium uppercase tracking-[0.08em]">Includes</dt>
                  <dd className="text-brown/75">
                    Market strategy · Portfolio mapping · Multi-city advisory ·
                    Investor relationships · Vendor network introductions in
                    financial services &amp; real estate law.
                  </dd>
                </div>
                <div>
                  <dt className="font-medium uppercase tracking-[0.08em]">Structure</dt>
                  <dd className="text-brown/75">
                    Project-based or retained. Discussed directly.
                  </dd>
                </div>
              </dl>
            </details>
          </Reveal>
        </div>
      </section>
    </>
  );
}
