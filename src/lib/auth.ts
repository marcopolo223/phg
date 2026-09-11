import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "phg_admin";
const WEEK = 60 * 60 * 24 * 7;

function secret() {
  return process.env.SESSION_SECRET || "";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

function equal(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export async function createSession() {
  const expires = String(Date.now() + WEEK * 1000);
  const token = `${expires}.${sign(expires)}`;
  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: WEEK,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function isLoggedIn() {
  if (!secret()) return false;
  const store = await cookies();
  const value = store.get(COOKIE)?.value;
  if (!value) return false;
  const [expires, hmac] = value.split(".");
  if (!expires || !hmac) return false;
  if (Number(expires) < Date.now()) return false;
  return equal(hmac, sign(expires));
}

export function credentialsConfigured() {
  return Boolean(
    process.env.ADMIN_USERNAME &&
      process.env.ADMIN_PASSWORD &&
      process.env.SESSION_SECRET,
  );
}

export function verifyCredentials(username: string, password: string) {
  const user = process.env.ADMIN_USERNAME || "";
  const pass = process.env.ADMIN_PASSWORD || "";
  if (!user || !pass) return false;
  return equal(username, user) && equal(password, pass);
}

export function hasSessionCookie(value: string | undefined) {
  return Boolean(value);
}
