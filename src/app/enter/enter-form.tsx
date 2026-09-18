"use client";

import { useActionState } from "react";
import { unlockSite, type UnlockState } from "@/app/actions/site-lock";

export function EnterForm({ from }: { from: string }) {
  const [state, action, pending] = useActionState(
    unlockSite,
    undefined as UnlockState,
  );

  return (
    <form action={action} className="mx-auto w-full max-w-md space-y-8">
      <input type="hidden" name="from" value={from} />
      <label className="block">
        <span className="font-label text-[11px] tracking-[0.02em] text-brown/70">
          Password
        </span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          className="mt-2 w-full border-0 border-b border-brown/25 bg-transparent px-0 py-2.5 text-[1.05rem] text-brown outline-none focus:border-brown"
        />
      </label>
      {state?.error ? (
        <p className="text-[0.95rem] text-red-800">{state.error}</p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-brown px-4 py-3 font-label text-[12px] tracking-[0.02em] text-cream disabled:opacity-60"
      >
        {pending ? "Entering…" : "Enter"}
      </button>
    </form>
  );
}
