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
        <h1 className="font-serif text-[clamp(2.4rem,11vw,6.4rem)] leading-[0.92] tracking-tight text-brown">
          THE DOOR
          <br />
          IS OPEN
        </h1>

        <p className="mt-12 font-display text-[16px] uppercase tracking-[0.18em] text-brown md:mt-20 md:text-[22px]">
          Contact Prince:
        </p>
        <a
          href={`mailto:${site.email}`}
          className="mt-5 inline-block max-w-full whitespace-nowrap text-[clamp(0.72rem,3.2vw,1.25rem)] text-brown underline underline-offset-4"
        >
          {site.email}
        </a>
        <p className="mx-auto mt-6 max-w-sm text-[1.02rem] leading-[1.8] text-brown/80 md:mx-0">
          Inquiries by email. A conversation, not a form.
        </p>

        <Image
          src="/images/contact/cat.webp"
          alt=""
          width={400}
          height={500}
          className="mx-auto mt-10 h-48 w-auto object-contain md:mx-0 md:mt-14 md:h-64 lg:h-72"
        />
      </Reveal>
    </section>
  );
}
