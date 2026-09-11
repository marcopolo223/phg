"use server";

import { revalidatePath } from "next/cache";
import { getContent, newId, saveContent, saveUpload } from "@/lib/content";
import { isLoggedIn } from "@/lib/auth";

export type ContentState = { error?: string; ok?: string } | undefined;

async function guard() {
  if (!(await isLoggedIn())) {
    throw new Error("Unauthorized");
  }
}

function refresh() {
  revalidatePath("/");
  revalidatePath("/markets-properties");
  revalidatePath("/advisory");
  revalidatePath("/dashboard");
}

export async function addMarket(_prev: ContentState, formData: FormData) {
  await guard();
  const name = String(formData.get("name") || "").trim();
  const copy = String(formData.get("copy") || "").trim();
  if (!name || !copy) return { error: "Name and description are required." };

  try {
    const image = await saveUpload(formData.get("image") as File | null);
    if (!image) return { error: "Please add a photo." };
    const content = await getContent();
    content.markets.push({
      id: newId(),
      name: name.toUpperCase(),
      copy,
      image,
      hidden: false,
    });
    await saveContent(content);
    refresh();
    return { ok: "Market added." };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Could not add market." };
  }
}

export async function removeMarket(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const content = await getContent();
  content.markets = content.markets.filter((item) => item.id !== id);
  await saveContent(content);
  refresh();
}

export async function addDeal(_prev: ContentState, formData: FormData) {
  await guard();
  const title = String(formData.get("title") || "").trim();
  const copy = String(formData.get("copy") || "").trim();
  if (!title || !copy) return { error: "Title and description are required." };

  try {
    const image = await saveUpload(formData.get("image") as File | null);
    if (!image) return { error: "Please add a photo." };
    const content = await getContent();
    content.deals.push({ id: newId(), title, copy, image, hidden: false });
    await saveContent(content);
    refresh();
    return { ok: "Transaction added." };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Could not add transaction." };
  }
}

export async function removeDeal(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const content = await getContent();
  content.deals = content.deals.filter((item) => item.id !== id);
  await saveContent(content);
  refresh();
}

export async function addQuote(_prev: ContentState, formData: FormData) {
  await guard();
  const name = String(formData.get("name") || "").trim();
  const body = String(formData.get("body") || "").trim();
  if (!name || !body) return { error: "Attribution and quote are required." };

  const content = await getContent();
  content.quotes.push({ id: newId(), name, body, hidden: false });
  await saveContent(content);
  refresh();
  return { ok: "Note added." };
}

export async function removeQuote(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const content = await getContent();
  content.quotes = content.quotes.filter((item) => item.id !== id);
  await saveContent(content);
  refresh();
}

export async function addListing(_prev: ContentState, formData: FormData) {
  await guard();
  const title = String(formData.get("title") || "").trim();
  const copy = String(formData.get("copy") || "").trim();
  if (!title || !copy) return { error: "Title and description are required." };

  try {
    const image = await saveUpload(formData.get("image") as File | null);
    if (!image) return { error: "Please add a photo." };
    const content = await getContent();
    content.listings.push({ id: newId(), title, copy, image, hidden: false });
    await saveContent(content);
    refresh();
    return { ok: "Listing added." };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Could not add listing." };
  }
}

export async function removeListing(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const content = await getContent();
  content.listings = content.listings.filter((item) => item.id !== id);
  await saveContent(content);
  refresh();
}

const KINDS = ["markets", "deals", "listings", "quotes"] as const;
type ContentKind = (typeof KINDS)[number];

export async function toggleHidden(formData: FormData) {
  await guard();
  const kind = String(formData.get("kind") || "") as ContentKind;
  const id = String(formData.get("id") || "");
  if (!KINDS.includes(kind) || !id) return;

  const content = await getContent();
  const item = content[kind].find((entry) => entry.id === id);
  if (!item) return;
  item.hidden = !item.hidden;
  await saveContent(content);
  refresh();
}
