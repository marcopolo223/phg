"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Wordmark } from "@/components/wordmark";
import { nav } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const home = pathname === "/" || pathname === "/about";
  const [open, setOpen] = useState(false);
  const [overHero, setOverHero] = useState(home);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    const html = document.documentElement;
    const prevBody = document.body.style.overflow;
    const prevHtml = html.style.overflow;
    document.body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevBody;
      html.style.overflow = prevHtml;
      window.removeEventListener("keydown", onKey);
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

  const overlay =
    mounted && open
      ? createPortal(
          <div
            id="mobile-nav"
            className="fixed inset-0 z-[200] flex h-[100dvh] flex-col bg-cream lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="flex items-center justify-between px-[max(1.25rem,env(safe-area-inset-left))] py-4 pr-[max(1.25rem,env(safe-area-inset-right))] pt-[max(1rem,env(safe-area-inset-top))]">
              <Link
                href="/"
                aria-label="Prince Hassan Group home"
                className="shrink-0 text-brown"
                onClick={() => setOpen(false)}
              >
                <Wordmark />
              </Link>
              <button
                type="button"
                className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-[7px]"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <span className="h-px w-6 translate-y-[4px] rotate-45 bg-brown" />
                <span className="h-px w-6 opacity-0 bg-brown" />
                <span className="h-px w-6 -translate-y-[4px] -rotate-45 bg-brown" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-center justify-center gap-7 px-6 pb-[max(3rem,env(safe-area-inset-bottom))] text-center">
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
                    className="nav-link block w-full text-center text-[clamp(1.65rem,6.5vw,2.35rem)] leading-none tracking-[0.08em]"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>,
          document.body,
        )
      : null;

  return (
    <header
      className={
        home
          ? `fixed inset-x-0 top-0 z-[100] transition-colors duration-300 ${
              overHero && !open ? "bg-transparent" : "bg-cream/95 backdrop-blur-md"
            }`
          : "sticky top-0 z-[100] border-b border-line/70 bg-cream/95 backdrop-blur-md"
      }
    >
      <div className="mx-auto flex w-full max-w-[1800px] items-center justify-between gap-4 px-[max(1.25rem,env(safe-area-inset-left))] py-4 pr-[max(1.25rem,env(safe-area-inset-right))] pt-[max(1rem,env(safe-area-inset-top))] md:gap-6 md:px-16 md:py-5 lg:px-20">
        <Link
          href="/"
          aria-label="Prince Hassan Group home"
          className={`relative z-10 shrink-0 cursor-pointer ${lightBars ? "text-cream" : "text-brown"}`}
          onClick={() => setOpen(false)}
        >
          <Wordmark />
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
      {overlay}
    </header>
  );
}
