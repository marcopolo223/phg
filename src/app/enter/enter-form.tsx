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
        <span className="font-label text-[14px] text-brown/70 md:text-[15px]">Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          aria-invalid={Boolean(state?.error)}
          aria-describedby={state?.error ? errorId : undefined}
          className="mt-3.5 w-full border-0 border-b border-brown/25 bg-transparent px-0 py-3 text-center text-[1.35rem] leading-none text-brown outline-none transition-[border-color] focus:border-brown md:text-[1.45rem]"
        />
      </label>
      {state?.error ? (
        <p
          id={errorId}
          role="alert"
          className="mt-5 text-[1.05rem] leading-snug text-brown/80"
        >
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-10 w-full bg-brown px-5 py-4 font-label text-[15px] text-cream transition-opacity disabled:opacity-60 md:text-[16px]"
      >
        {pending ? "Entering…" : "Enter"}
      </button>
    </form>
  );
}
