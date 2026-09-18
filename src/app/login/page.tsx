import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/app/login/login-form";
import { StudioHeader } from "@/components/studio-header";
import { isLoggedIn } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  if (await isLoggedIn()) redirect("/dashboard");

  return (
    <>
      <StudioHeader />
      <section className="mx-auto flex min-h-[calc(100svh-8rem)] w-full max-w-lg flex-col justify-center px-5 py-16 md:px-8">
        <p className="font-label text-[11px] tracking-[0.02em] text-brown/60">
          Private
        </p>
        <h1 className="mt-3 font-serif text-[clamp(1.8rem,6vw,2.8rem)] uppercase tracking-tight text-brown">
          Studio
        </h1>
        <p className="mt-4 text-[1.02rem] leading-[1.8] text-brown/70">
          Sign in to manage Prince Hassan Group.
        </p>
        <div className="mt-10">
          <LoginForm />
        </div>
      </section>
    </>
  );
}
