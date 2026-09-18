"use server";

import { redirect } from "next/navigation";
import {
  createSiteSession,
  sitePasswordConfigured,
  verifySitePassword,
} from "@/lib/site-lock";

export type UnlockState = { error?: string } | undefined;

export async function unlockSite(_prev: UnlockState, formData: FormData) {
  if (!sitePasswordConfigured()) {
    return { error: "The site password is not configured yet." };
  }

  const password = String(formData.get("password") || "");
  if (!verifySitePassword(password)) {
    return { error: "That password is not right." };
  }

  try {
    await createSiteSession();
  } catch {
    return { error: "SESSION_SECRET is missing in this environment." };
  }
  const from = String(formData.get("from") || "").trim();
  const next = from.startsWith("/") && !from.startsWith("//") && from !== "/enter"
    ? from
    : "/";
  redirect(next);
}
