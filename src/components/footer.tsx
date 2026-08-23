import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

const left = [
  { href: "/", label: "About" },
  { href: "/advisory", label: "Real Estate Advisory" },
  { href: "/markets-properties", label: "Markets & Properties" },
  { href: "/experiences", label: "Experiences" },
];

const right = [
  { href: "/contact-prince", label: "Contact Prince" },
  { href: site.instagram, label: "Instagram", external: true },
  { href: site.compass, label: "Compass Active Listings", external: true },
];

export function Footer() {
  return (
    <footer className="bg-[#4a433c] text-cream">
      <div className="mx-auto grid max-w-[1680px] items-center gap-10 px-[max(1.25rem,env(safe-area-inset-left))] py-12 pr-[max(1.25rem,env(safe-area-inset-right))] pb-[max(3.5rem,env(safe-area-inset-bottom))] md:grid-cols-[1fr_auto_1fr] md:gap-8 md:px-12 md:py-20">
        <nav className="flex flex-col gap-1.5 md:col-start-1 md:row-start-1">
          {left.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link w-fit py-1.5">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="order-first flex flex-col items-center justify-center gap-4 md:order-none md:col-start-2 md:row-start-1 md:flex-row md:gap-8">
          <div className="text-center">
            <p className="font-serif text-4xl tracking-tight md:text-5xl lg:text-6xl">
              PRINCE.
            </p>
            <p className="mt-2 font-display text-[12px] uppercase tracking-[0.18em] text-cream/80 md:mt-3 md:text-[14px]">
              Precision · Pulse · Presence
            </p>
          </div>
          <Image
            src="/brand/cat.webp"
            alt=""
            width={400}
            height={500}
            className="h-24 w-auto object-contain brightness-0 invert md:h-40 lg:h-48"
          />
        </div>

        <div className="flex flex-col gap-1.5 md:col-start-3 md:row-start-1 md:items-end md:text-right">
          {right.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="nav-link w-fit py-1.5 md:ml-auto"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link w-fit py-1.5 md:ml-auto"
              >
                {item.label}
              </Link>
            ),
          )}
          <p className="mt-5 font-display text-[11px] uppercase tracking-[0.14em] text-cream/60 md:mt-6 md:text-[12px]">
            © 2026 Prince Hassan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
