"use server";

import { redirect } from "next/navigation";
import {
  createSession,
  credentialsConfigured,
  destroySession,
  verifyCredentials,
} from "@/lib/auth";

export type LoginState = { error?: string } | undefined;

export async function login(_prev: LoginState, formData: FormData) {
  if (!credentialsConfigured()) {
    return {
      error: "Dashboard login is not configured. Add credentials in .env.local.",
    };
  }

  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");

  if (!verifyCredentials(username, password)) {
    return { error: "That email or password is not right." };
  }

  await createSession();
  redirect("/dashboard");
}

export async function logout() {
  await destroySession();
  redirect("/login");
}
