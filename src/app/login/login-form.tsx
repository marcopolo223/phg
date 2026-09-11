"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/actions/auth";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined as LoginState);

  return (
    <form action={action} className="mx-auto w-full max-w-md space-y-5">
      <label className="block">
        <span className="font-label text-[11px] tracking-[0.18em] text-brown/70">Email</span>
        <input
          name="username"
          type="email"
          autoComplete="username"
          required
          className="mt-2 w-full border-0 border-b border-brown/25 bg-transparent px-0 py-2.5 text-[1.05rem] text-brown outline-none focus:border-brown"
        />
      </label>
      <label className="block">
        <span className="font-label text-[11px] tracking-[0.18em] text-brown/70">Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-2 w-full border-0 border-b border-brown/25 bg-transparent px-0 py-2.5 text-[1.05rem] text-brown outline-none focus:border-brown"
        />
      </label>
      {state?.error ? (
        <p className="text-[0.95rem] text-red-800">{state.error}</p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-brown px-4 py-3 font-label text-[12px] tracking-[0.16em] text-cream disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
