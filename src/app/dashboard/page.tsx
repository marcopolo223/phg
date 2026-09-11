import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { logout } from "@/app/actions/auth";
import { DashboardClient } from "@/app/dashboard/dashboard-client";
import { StudioHeader } from "@/components/studio-header";
import { isLoggedIn } from "@/lib/auth";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  if (!(await isLoggedIn())) redirect("/login");
  const content = await getContent();

  return (
    <>
      <StudioHeader
        actions={
          <form action={logout}>
            <button type="submit" className="nav-link">
              Sign out
            </button>
          </form>
        }
      />
      <section className="mx-auto w-full max-w-[1400px] px-5 py-12 md:px-16 md:py-16 lg:px-20">
        <p className="font-label text-[11px] tracking-[0.18em] text-brown/60">
          Private
        </p>
        <h1 className="mt-3 font-serif text-[clamp(1.85rem,5vw,3.2rem)] uppercase tracking-tight text-brown">
          Studio
        </h1>
        <p className="mt-4 max-w-xl text-[1.02rem] leading-[1.8] text-brown/75">
          Markets, listings, past transactions, and overheard notes — in the
          same language as the site.
        </p>
        <div className="mt-12 md:mt-16">
          <DashboardClient
            markets={content.markets}
            deals={content.deals}
            quotes={content.quotes}
            listings={content.listings}
          />
        </div>
      </section>
    </>
  );
}
