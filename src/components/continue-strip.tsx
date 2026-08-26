import Link from "next/link";
import { Reveal } from "@/components/reveal";

export function ContinueStrip({
  kicker,
  href,
  label,
}: {
  kicker: string;
  href: string;
  label: string;
}) {
  return (
    <section className="px-5 py-20 md:px-12 md:py-28">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-[13px] uppercase tracking-[0.22em] text-brown/70">
            {kicker}
          </p>
          <Link
            href={href}
            className="mt-4 inline-block font-serif text-[clamp(1.7rem,4vw,2.6rem)] uppercase leading-tight tracking-tight text-brown underline decoration-brown/30 underline-offset-[0.28em] transition hover:decoration-brown"
          >
            {label}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
