import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Experiences",
};

function Photo({
  src,
  width,
  height,
  priority,
}: {
  src: string;
  width: number;
  height: number;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt=""
      width={width}
      height={height}
      priority={priority}
      className="absolute inset-0 h-full w-full object-cover"
      sizes="(min-width: 768px) 22vw, 50vw"
    />
  );
}

export default function ExperiencesPage() {
  return (
    <section className="exp-collage pt-16 md:pt-24">
      <Reveal className="exp-photo exp-lisha">
        <Photo src="/images/experiences/lisha.webp" width={2500} height={3748} />
      </Reveal>

      <Reveal delay={80} className="exp-photo exp-mexico">
        <Photo
          src="/images/experiences/mexico.webp"
          width={1928}
          height={2500}
        />
      </Reveal>

      <Reveal className="exp-invite flex items-end justify-center">
        <p className="font-display text-[22px] uppercase tracking-[0.2em] text-brown md:text-[26px] lg:text-[31px]">
          An Invitation To
        </p>
      </Reveal>

      <Reveal
        delay={60}
        className="exp-headline flex items-center justify-center px-2"
      >
        <h1 className="w-full text-center font-serif text-[clamp(1.44rem,6.96vw,5.7rem)] leading-[0.92] tracking-tight text-brown">
          <span className="block md:whitespace-nowrap">THE EXPERIENCES THAT</span>
          <span className="block md:whitespace-nowrap">LEAVE AN IMPRINT.</span>
        </h1>
      </Reveal>

      <Reveal delay={100} className="exp-body flex items-start">
        <div className="text-[1.15rem] leading-[1.8] text-brown md:text-[1.35rem]">
          <p>
            Enter a private world of dinners, retreats, and gatherings curated
            for those who move through Prince&apos;s markets and inner circle.
            Each experience is built around an immersive moment, in an
            awe-inspiring setting, with a curated room of people.
          </p>
        </div>
      </Reveal>

      <Reveal delay={120} className="exp-whether flex items-start">
        <p className="text-[1.15rem] leading-[1.8] text-brown md:text-[1.35rem]">
          Whether its sipping on a fresh green juice among the lavender fields
          in Southern France, participating in sunrise breathwork in a villa in
          Mexico, or attending a penthouse founder&apos;s dinner in Chelsea,
          NYC— each Experience is unrepeatable. Prince selects these rooms the
          way he selects a property: to make a lasting impression.
        </p>
      </Reveal>

      <Reveal delay={140} className="exp-inquire flex items-start pt-2">
        <p className="font-serif italic leading-[1.8] text-brown text-[1.15rem] md:text-[1.35rem]">
          to inquire about joining, reach out to prince directly.
        </p>
      </Reveal>

      <Reveal delay={40} className="exp-photo exp-philia">
        <Photo
          src="/images/experiences/philia.webp"
          width={1280}
          height={1909}
          priority
        />
      </Reveal>

      <Reveal delay={120} className="exp-photo exp-france">
        <Photo
          src="/images/experiences/france.webp"
          width={2500}
          height={1667}
        />
      </Reveal>

      <Reveal delay={160} className="exp-photo exp-chelsea">
        <Photo
          src="/images/experiences/chelsea.webp"
          width={2500}
          height={1667}
        />
      </Reveal>
    </section>
  );
}
