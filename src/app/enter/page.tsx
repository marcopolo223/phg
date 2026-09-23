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
    <section className="flex min-h-[100svh] w-full flex-col items-center justify-center px-[max(1.5rem,env(safe-area-inset-left))] py-[max(4rem,env(safe-area-inset-top))] pr-[max(1.5rem,env(safe-area-inset-right))] pb-[max(4rem,env(safe-area-inset-bottom))]">
      <div className="flex w-full max-w-[26rem] flex-col items-center text-center">
        <h1 className="text-brown">
          <Wordmark size="enter" className="block text-center" />
        </h1>
        <p className="mt-7 font-label text-[15px] text-brown/50 md:text-[16px]">
          Precision · Pulse · Presence
        </p>
        <p className="mt-12 text-[1.2rem] leading-[1.7] text-brown/65 md:text-[1.28rem]">
          This site is private.
        </p>
        <div className="mt-10 w-full">
          <EnterForm from={from} />
        </div>
      </div>
    </section>
  );
}
