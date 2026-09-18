import { redirect } from "next/navigation";
import { requireSiteUnlock } from "@/lib/site-lock";

export default async function AboutPage() {
  await requireSiteUnlock();
  redirect("/");
}
