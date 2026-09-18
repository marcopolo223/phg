import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SITE_COOKIE = "phg_site";
const MONTH = 60 * 60 * 24 * 30;

function secret() {
  return process.env.SESSION_SECRET || "";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(`site.${value}`).digest("base64url");
}

function equal(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function sitePasswordConfigured() {
  return Boolean(process.env.SITE_PASSWORD && secret());
}

export function verifySitePassword(password: string) {
  const expected = process.env.SITE_PASSWORD || "";
  if (!expected || !password) return false;
  return equal(password, expected);
}

export async function createSiteSession() {
  const expires = String(Date.now() + MONTH * 1000);
  const token = `${expires}.${sign(expires)}`;
  const store = await cookies();
  store.set(SITE_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MONTH,
  });
}

export async function isSiteUnlocked() {
  if (!sitePasswordConfigured()) return true;
  const store = await cookies();
  const value = store.get(SITE_COOKIE)?.value;
  if (!value) return false;
  const [expires, hmac] = value.split(".");
  if (!expires || !hmac) return false;
  if (Number(expires) < Date.now()) return false;
  return equal(hmac, sign(expires));
}
