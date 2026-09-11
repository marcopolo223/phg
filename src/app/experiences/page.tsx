import type { Metadata } from "next";
import Image from "next/image";
import { ContinueStrip } from "@/components/continue-strip";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Experiences",
};

export default function ExperiencesPage() {
  return (
    <>
      <section className="relative flex min-h-[72svh] items-center justify-center overflow-hidden px-5 py-28 md:min-h-[78svh] md:py-36">
        <Image
          src="/images/experiences/lisha.webp"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-cream/55" />
        <Reveal className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="font-display text-[15px] uppercase tracking-[0.22em] text-brown">
            Experiences
          </p>
          <h1 className="mt-6 font-serif text-[clamp(1.85rem,5.5vw,3.25rem)] uppercase leading-[0.95] tracking-tight text-brown">
            Coming soon
          </h1>
          <p className="mx-auto mt-8 max-w-md text-[1rem] leading-[1.8] text-brown md:text-[1.05rem]">
            A private calendar of rooms, tables, and landscapes — released in
            season, and only by introduction.
          </p>
        </Reveal>
      </section>
      <ContinueStrip
        kicker="Continue"
        href="/contact-prince"
        label="Contact Prince"
      />
    </>
  );
}
