"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const home = pathname === "/" || pathname === "/about";
  const [open, setOpen] = useState(false);
  const [overHero, setOverHero] = useState(home);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!home) {
      setOverHero(false);
      return;
    }
    const onScroll = () => {
      setOverHero(window.scrollY < window.innerHeight * 0.72);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [home]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const lightBars = home && overHero && !open;

  return (
    <header
      className={
        home
          ? `fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
              overHero && !open ? "bg-transparent" : "bg-cream/95 backdrop-blur-md"
            }`
          : "sticky top-0 z-50 border-b border-line/70 bg-cream/95 backdrop-blur-md"
      }
    >
      <div className="mx-auto flex w-full max-w-[1800px] items-center justify-between gap-4 px-[max(1.25rem,env(safe-area-inset-left))] py-3 pr-[max(1.25rem,env(safe-area-inset-right))] pt-[max(0.75rem,env(safe-area-inset-top))] md:gap-6 md:px-16 md:py-5 lg:px-20">
        <Link href="/" className="relative shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/brand/logo.png"
            alt="Prince Hassan Group"
            width={220}
            height={126}
            priority
            className="h-[3.15rem] w-auto object-contain sm:h-[3.5rem] md:h-[4.15rem]"
          />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-8">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/" || pathname === "/about"
                : pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={active}
                className="nav-link"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-[7px] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-px w-6 transition ${lightBars ? "bg-cream" : "bg-brown"} ${open ? "translate-y-[4px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 transition ${lightBars ? "bg-cream" : "bg-brown"} ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-px w-6 transition ${lightBars ? "bg-cream" : "bg-brown"} ${open ? "-translate-y-[4px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-line bg-cream px-[max(1.5rem,env(safe-area-inset-left))] py-8 pr-[max(1.5rem,env(safe-area-inset-right))] lg:hidden"
        >
          <div className="flex min-h-[min(70svh,28rem)] flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link py-2.5"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
