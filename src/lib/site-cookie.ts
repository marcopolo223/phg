import { createHmac, timingSafeEqual } from "node:crypto";

export const SITE_COOKIE = "phg_site";
export const SITE_SESSION_MONTH = 60 * 60 * 24 * 30;

function env(name: string) {
  return process.env[name] || "";
}

export function sitePassword() {
  return env("SITE_PASSWORD");
}

export function sessionSecret() {
  return env("SESSION_SECRET");
}

export function sitePasswordConfigured() {
  return Boolean(sitePassword());
}

function sign(value: string) {
  return createHmac("sha256", sessionSecret())
    .update(`site.${value}`)
    .digest("base64url");
}

function equal(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function verifySitePassword(password: string) {
  const expected = sitePassword();
  if (!expected || !password) return false;
  return equal(password, expected);
}

export function signSiteSession(expires: string) {
  return `${expires}.${sign(expires)}`;
}

export function isSiteCookieValid(value: string | undefined) {
  if (!value || !sessionSecret()) return false;
  const [expires, hmac] = value.split(".");
  if (!expires || !hmac) return false;
  if (Number(expires) < Date.now()) return false;
  return equal(hmac, sign(expires));
}
