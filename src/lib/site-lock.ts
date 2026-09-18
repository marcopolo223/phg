import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SITE_COOKIE,
  SITE_SESSION_MONTH,
  isSiteCookieValid,
  sessionSecret,
  signSiteSession,
  sitePasswordConfigured,
} from "@/lib/site-cookie";

export {
  SITE_COOKIE,
  isSiteCookieValid,
  sitePassword,
  sitePasswordConfigured,
  verifySitePassword,
} from "@/lib/site-cookie";

export async function createSiteSession() {
  if (!sessionSecret()) {
    throw new Error("SESSION_SECRET is not configured.");
  }
  const token = signSiteSession(String(Date.now() + SITE_SESSION_MONTH * 1000));
  const store = await cookies();
  store.set(SITE_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SITE_SESSION_MONTH,
  });
}

export async function isSiteUnlocked() {
  if (!sitePasswordConfigured()) return true;
  const store = await cookies();
  return isSiteCookieValid(store.get(SITE_COOKIE)?.value);
}

export async function requireSiteUnlock() {
  if (sitePasswordConfigured() && !(await isSiteUnlocked())) {
    redirect("/enter");
  }
}
