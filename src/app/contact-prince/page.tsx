import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Prince",
};

export default function ContactPage() {
  return (
    <section className="mx-auto flex min-h-[calc(100svh-8rem)] max-w-[1680px] flex-col items-center gap-10 px-5 py-12 md:grid md:grid-cols-2 md:items-center md:gap-16 md:px-12 md:py-20 lg:gap-24">
      <Reveal className="w-full">
        <Image
          src="/images/contact/prince-bw.webp"
          alt="Prince Hassan"
          width={1200}
          height={1600}
          priority
          className="aspect-[5/7] w-full object-cover object-top"
        />
      </Reveal>

      <Reveal delay={140} className="w-full text-center md:text-left">
        <h1 className="font-serif text-[clamp(1.85rem,6.5vw,3.6rem)] leading-[0.95] tracking-tight text-brown">
          THE DOOR
          <br />
          IS OPEN
        </h1>

        <p className="mt-10 font-display text-[14px] uppercase tracking-[0.02em] text-brown md:mt-14 md:text-[16px]">
          Contact Prince:
        </p>
        <a
          href={`mailto:${site.email}`}
          className="mt-5 inline-block max-w-full whitespace-nowrap text-[clamp(0.72rem,3.2vw,1.25rem)] text-brown underline underline-offset-4"
        >
          {site.email}
        </a>

        <Image
          src="/images/contact/cat.webp"
          alt=""
          width={400}
          height={500}
          className="mx-auto mt-10 h-40 w-auto object-contain md:mx-0 md:mt-12 md:h-52 lg:h-56"
        />
      </Reveal>
    </section>
  );
}
