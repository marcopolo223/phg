"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const studio =
    pathname === "/login" ||
    pathname === "/enter" ||
    pathname.startsWith("/dashboard");

  return (
    <>
      {studio ? null : <Header />}
      <main className="flex-1 overflow-x-clip">{children}</main>
      {studio ? null : <Footer />}
    </>
  );
}
