import Link from "next/link";
import { Wordmark } from "@/components/wordmark";

export function StudioHeader({
  actions,
}: {
  actions?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-[100] border-b border-line/70 bg-cream/95 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1800px] items-center justify-between gap-4 px-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] pb-4 pt-[max(1.75rem,calc(env(safe-area-inset-top)+0.75rem))] md:gap-6 md:px-16 md:pb-5 md:pt-[max(2.15rem,calc(env(safe-area-inset-top)+1rem))] lg:items-start lg:px-20">
        <Link
          href="/"
          aria-label="Prince Hassan Group home"
          className="shrink-0 text-brown"
        >
          <Wordmark />
        </Link>
        <nav className="flex items-center gap-5 sm:gap-8 lg:pt-[0.2rem]">
          <Link href="/" className="nav-link">
            The site
          </Link>
          {actions}
        </nav>
      </div>
    </header>
  );
}
