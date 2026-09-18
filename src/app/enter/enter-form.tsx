"use client";

import { useActionState, useId } from "react";
import { unlockSite, type UnlockState } from "@/app/actions/site-lock";

export function EnterForm({ from }: { from: string }) {
  const [state, action, pending] = useActionState(
    unlockSite,
    undefined as UnlockState,
  );
  const errorId = useId();

  return (
    <form action={action} className="w-full text-center">
      <input type="hidden" name="from" value={from} />
      <label className="block">
        <span className="font-label text-[11px] text-brown/70">Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          aria-invalid={Boolean(state?.error)}
          aria-describedby={state?.error ? errorId : undefined}
          className="mt-2.5 w-full border-0 border-b border-brown/25 bg-transparent px-0 py-2 text-center text-[1.05rem] leading-none text-brown outline-none transition-[border-color] focus:border-brown"
        />
      </label>
      {state?.error ? (
        <p
          id={errorId}
          role="alert"
          className="mt-4 text-[0.88rem] leading-snug text-brown/80"
        >
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-8 w-full bg-brown px-4 py-3 font-label text-[12px] text-cream transition-opacity disabled:opacity-60"
      >
        {pending ? "Entering…" : "Enter"}
      </button>
    </form>
  );
}
