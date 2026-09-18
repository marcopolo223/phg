import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { EnterForm } from "@/app/enter/enter-form";
import { Wordmark } from "@/components/wordmark";
import { isSiteUnlocked, sitePasswordConfigured } from "@/lib/site-lock";

export const metadata: Metadata = {
  title: "Private",
  robots: { index: false, follow: false },
};

export default async function EnterPage({
  searchParams,
}: PageProps<"/enter">) {
  if (!sitePasswordConfigured()) redirect("/");
  if (await isSiteUnlocked()) redirect("/");

  const query = await searchParams;
  const from = typeof query.from === "string" ? query.from : "/";

  return (
    <section className="mx-auto flex min-h-[100svh] w-full max-w-lg flex-col justify-center px-5 py-16 md:px-8">
      <div className="mb-12 text-brown">
        <Wordmark size="footer" />
        <p className="mt-10 font-label text-[11px] tracking-[0.02em] text-brown/60">
          Private
        </p>
        <p className="mt-4 max-w-sm text-[1.02rem] leading-[1.8] text-brown/70">
          Enter the password to view the site.
        </p>
      </div>
      <EnterForm from={from} />
    </section>
  );
}
