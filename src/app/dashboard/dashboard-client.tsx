"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import {
  addDeal,
  addListing,
  addMarket,
  addQuote,
  removeDeal,
  removeListing,
  removeMarket,
  removeQuote,
  toggleHidden,
  type ContentState,
} from "@/app/actions/content";
import { ImageCropField } from "@/components/image-crop-field";
import type { Deal, Listing, Market, Quote } from "@/lib/content";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-label text-[11px] text-brown/70">
        {label}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputClass =
  "w-full border-0 border-b border-brown/25 bg-transparent px-0 py-2.5 text-[1.05rem] text-brown outline-none placeholder:text-brown/35 focus:border-brown";

function Status({ state }: { state: ContentState }) {
  if (!state?.error && !state?.ok) return null;
  return (
    <p className={`text-[0.98rem] ${state.error ? "text-red-800" : "text-brown"}`}>
      {state.error || state.ok}
    </p>
  );
}

function ResetOnOk({
  state,
  formRef,
}: {
  state: ContentState;
  formRef: React.RefObject<HTMLFormElement | null>;
}) {
  useEffect(() => {
    if (state?.ok) formRef.current?.reset();
  }, [state, formRef]);
  return null;
}

function SaveButton({
  pending,
  label,
}: {
  pending: boolean;
  label: string;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-brown px-8 py-3 font-label text-[12px] text-cream disabled:opacity-60"
    >
      {pending ? "Saving…" : label}
    </button>
  );
}

function RemoveButton({ label }: { label: string }) {
  return (
    <button
      type="submit"
      className="font-label text-[11px] text-cream underline decoration-cream/50 underline-offset-[0.32em]"
    >
      {label}
    </button>
  );
}

function VisibilityActions({
  id,
  kind,
  hidden,
  removeAction,
  confirm,
  tone = "ink",
}: {
  id: string;
  kind: "markets" | "deals" | "listings" | "quotes";
  hidden: boolean;
  removeAction: (formData: FormData) => void | Promise<void>;
  confirm: string;
  tone?: "ink" | "cream";
}) {
  const link =
    tone === "cream"
      ? "font-label text-[11px] text-cream underline decoration-cream/50 underline-offset-[0.32em]"
      : "nav-link";

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {hidden ? (
        <span
          className={`font-label text-[10px] ${
            tone === "cream" ? "text-cream" : "text-brown/55"
          }`}
        >
          Hidden
        </span>
      ) : null}
      <form action={toggleHidden}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="kind" value={kind} />
        <button type="submit" className={link}>
          {hidden ? "Show" : "Hide"}
        </button>
      </form>
      <form
        action={removeAction}
        onSubmit={(event) => {
          if (!window.confirm(confirm)) event.preventDefault();
        }}
      >
        <input type="hidden" name="id" value={id} />
        {tone === "cream" ? (
          <RemoveButton label="Remove" />
        ) : (
          <button type="submit" className="nav-link">
            Remove
          </button>
        )}
      </form>
    </div>
  );
}

function MarketsPanel({ markets }: { markets: Market[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(
    addMarket,
    undefined as ContentState,
  );

  return (
    <section className="grid gap-16 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
      <form ref={formRef} action={action} className="space-y-8">
        <ResetOnOk state={state} formRef={formRef} />
        <div>
          <p className="font-label text-[11px] text-brown/60">
            New market
          </p>
          <h2 className="mt-3 font-serif text-[clamp(1.45rem,3vw,2.05rem)] uppercase tracking-tight">
            Add a city
          </h2>
        </div>
        <Field label="City name">
          <input name="name" required placeholder="Miami" className={inputClass} />
        </Field>
        <Field label="Caption">
          <textarea
            name="copy"
            required
            rows={3}
            className={inputClass}
            placeholder="A short line over the photograph."
          />
        </Field>
        <ImageCropField
          name="image"
          aspect={4 / 3}
          hint="Any photograph works. Drag to frame the crop — this is the 4:3 card on Markets. Wide banners crop a little more from the top and bottom."
        />
        <Status state={state} />
        <SaveButton pending={pending} label="Add market" />
      </form>

      {markets.length ? (
        <ul className="grid gap-3 sm:grid-cols-2">
          {markets.map((market) => (
            <li
              key={market.id}
              className={`relative aspect-[4/3] overflow-hidden ${
                market.hidden ? "opacity-55" : ""
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={market.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/15" />
              <div className="absolute inset-x-0 bottom-0 px-5 pb-5 text-center">
                <p className="font-display text-[clamp(1.4rem,4vw,2.1rem)] leading-none text-cream">
                  {market.name}
                </p>
                <p className="mx-auto mt-2 max-w-[16rem] text-[0.9rem] leading-snug text-cream">
                  {market.copy}
                </p>
              </div>
              <div className="absolute right-4 top-4">
                <VisibilityActions
                  id={market.id}
                  kind="markets"
                  hidden={market.hidden}
                  removeAction={removeMarket}
                  confirm="Remove this market from the site?"
                  tone="cream"
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="font-serif text-[1.2rem] text-brown/55">No markets yet.</p>
      )}
    </section>
  );
}

function DealList({
  items,
  kind,
  onRemove,
  confirm,
}: {
  items: Array<{
    id: string;
    title: string;
    copy: string;
    image: string;
    hidden: boolean;
  }>;
  kind: "deals" | "listings";
  onRemove: (formData: FormData) => void | Promise<void>;
  confirm: string;
}) {
  if (!items.length) {
    return (
      <p className="font-serif text-[1.2rem] text-brown/55">Nothing here yet.</p>
    );
  }

  return (
    <ul className="grid gap-10 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.id} className={item.hidden ? "opacity-55" : ""}>
          <div className="relative aspect-square overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <h3 className="mt-4 font-serif text-[1.15rem] leading-snug md:text-[1.28rem]">
            {item.title}
          </h3>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-brown/75">
            {item.copy}
          </p>
          <div className="mt-4">
            <VisibilityActions
              id={item.id}
              kind={kind}
              hidden={item.hidden}
              removeAction={onRemove}
              confirm={confirm}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function DealsPanel({ deals }: { deals: Deal[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(
    addDeal,
    undefined as ContentState,
  );

  return (
    <section className="grid gap-16 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
      <form ref={formRef} action={action} className="space-y-8">
        <ResetOnOk state={state} formRef={formRef} />
        <div>
          <p className="font-label text-[11px] text-brown/60">
            Closed
          </p>
          <h2 className="mt-3 font-serif text-[clamp(1.45rem,3vw,2.05rem)] uppercase tracking-tight">
            Add a transaction
          </h2>
        </div>
        <Field label="Title">
          <input
            name="title"
            required
            placeholder="Address — $0"
            className={inputClass}
          />
        </Field>
        <Field label="Caption">
          <textarea name="copy" required rows={3} className={inputClass} />
        </Field>
        <ImageCropField
          name="image"
          aspect={1}
          hint="Any photograph works. Drag to frame the crop — listings and past transactions use a square on the site."
        />
        <Status state={state} />
        <SaveButton pending={pending} label="Add transaction" />
      </form>
      <DealList
        items={deals}
        kind="deals"
        onRemove={removeDeal}
        confirm="Remove this transaction from the site?"
      />
    </section>
  );
}

function ListingsPanel({ listings }: { listings: Listing[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(
    addListing,
    undefined as ContentState,
  );

  return (
    <section className="grid gap-16 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
      <form ref={formRef} action={action} className="space-y-8">
        <ResetOnOk state={state} formRef={formRef} />
        <div>
          <p className="font-label text-[11px] text-brown/60">
            For sale
          </p>
          <h2 className="mt-3 font-serif text-[clamp(1.45rem,3vw,2.05rem)] uppercase tracking-tight">
            Add a listing
          </h2>
        </div>
        <Field label="Title">
          <input
            name="title"
            required
            placeholder="Address — $0"
            className={inputClass}
          />
        </Field>
        <Field label="Caption">
          <textarea name="copy" required rows={3} className={inputClass} />
        </Field>
        <ImageCropField
          name="image"
          aspect={1}
          hint="Any photograph works. Drag to frame the crop — this is the square card on Current listings."
        />
        <Status state={state} />
        <SaveButton pending={pending} label="Add listing" />
      </form>
      <DealList
        items={listings}
        kind="listings"
        onRemove={removeListing}
        confirm="Remove this listing from the site?"
      />
    </section>
  );
}

function QuotesPanel({ quotes }: { quotes: Quote[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(
    addQuote,
    undefined as ContentState,
  );

  return (
    <section className="grid gap-16 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
      <form ref={formRef} action={action} className="space-y-8">
        <ResetOnOk state={state} formRef={formRef} />
        <div>
          <p className="font-label text-[11px] text-brown/60">
            Overheard
          </p>
          <h2 className="mt-3 font-serif text-[clamp(1.45rem,3vw,2.05rem)] uppercase tracking-tight">
            Add a note
          </h2>
        </div>
        <Field label="Attribution">
          <input
            name="name"
            required
            placeholder="Name · Buyer · City"
            className={inputClass}
          />
        </Field>
        <Field label="Quote">
          <textarea
            name="body"
            required
            rows={4}
            className={inputClass}
            placeholder="Wrap a phrase in *asterisks* to italicize it."
          />
        </Field>
        <Status state={state} />
        <SaveButton pending={pending} label="Add note" />
      </form>

      {quotes.length ? (
        <ul className="space-y-10">
          {quotes.map((quote) => (
            <li
              key={quote.id}
              className={`border-b border-brown/15 pb-10 ${
                quote.hidden ? "opacity-55" : ""
              }`}
            >
              <p className="font-quote text-[1.2rem] leading-relaxed md:text-[1.35rem]">
                “{quote.body}”
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <p className="font-label text-[11px] text-brown/70">
                  {quote.name}
                </p>
                <VisibilityActions
                  id={quote.id}
                  kind="quotes"
                  hidden={quote.hidden}
                  removeAction={removeQuote}
                  confirm="Remove this note from the site?"
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="font-serif text-[1.2rem] text-brown/55">No notes yet.</p>
      )}
    </section>
  );
}

export function DashboardClient({
  markets,
  deals,
  quotes,
  listings,
}: {
  markets: Market[];
  deals: Deal[];
  quotes: Quote[];
  listings: Listing[];
}) {
  const [tab, setTab] = useState<"markets" | "deals" | "listings" | "quotes">(
    "markets",
  );
  const tabs = [
    { id: "markets" as const, label: "Markets" },
    { id: "listings" as const, label: "Current listings" },
    { id: "deals" as const, label: "Past transactions" },
    { id: "quotes" as const, label: "Overheard" },
  ];

  return (
    <div>
      <nav className="mb-14 flex flex-wrap gap-x-7 gap-y-3 border-b border-brown/15 pb-4 md:mb-16">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            data-active={tab === item.id}
            className="nav-link"
          >
            {item.label}
          </button>
        ))}
      </nav>
      {tab === "markets" ? <MarketsPanel markets={markets} /> : null}
      {tab === "listings" ? <ListingsPanel listings={listings} /> : null}
      {tab === "deals" ? <DealsPanel deals={deals} /> : null}
      {tab === "quotes" ? <QuotesPanel quotes={quotes} /> : null}
    </div>
  );
}
