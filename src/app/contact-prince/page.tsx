import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Prince",
};

export default function ContactPage() {
  return (
    <section className="mx-auto grid min-h-[calc(100svh-8rem)] max-w-[1680px] items-center gap-12 px-5 py-16 md:grid-cols-2 md:gap-16 md:px-12 md:py-20 lg:gap-24">
      <Reveal>
        <h1 className="font-serif text-[clamp(2.6rem,12vw,6.4rem)] leading-[0.92] tracking-tight text-brown">
          THE DOOR
          <br />
          IS OPEN
        </h1>

        <p className="mt-16 font-display text-[18px] uppercase tracking-[0.18em] text-brown md:mt-20 md:text-[22px]">
          Contact Prince:
        </p>
        <a
          href={`mailto:${site.email}`}
          className="mt-5 block w-fit break-all text-lg text-brown underline underline-offset-4 md:break-normal md:text-xl"
        >
          {site.email}
        </a>
        <p className="mt-4 text-lg leading-relaxed text-brown md:text-xl">
          {site.address[0]}
          <br />
          {site.address[1]}
        </p>

        <Image
          src="/images/contact/cat.webp"
          alt=""
          width={400}
          height={500}
          className="mx-auto mt-10 h-48 w-auto object-contain md:mt-14 md:h-64 lg:h-72"
        />
      </Reveal>

      <Reveal delay={140}>
        <Image
          src="/images/contact/prince-bw.webp"
          alt="Prince Hassan"
          width={1200}
          height={1600}
          priority
          className="aspect-[5/7] w-full object-cover object-top"
        />
      </Reveal>
    </section>
  );
}
