import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { get, put } from "@vercel/blob";

export type Market = {
  id: string;
  name: string;
  copy: string;
  image: string;
  hidden: boolean;
};

export type Deal = {
  id: string;
  title: string;
  copy: string;
  image: string;
  hidden: boolean;
};

export type Quote = {
  id: string;
  name: string;
  body: string;
  hidden: boolean;
};

export type Listing = {
  id: string;
  title: string;
  copy: string;
  image: string;
  hidden: boolean;
};

export type SiteContent = {
  markets: Market[];
  deals: Deal[];
  quotes: Quote[];
  listings: Listing[];
};

const EMPTY: SiteContent = { markets: [], deals: [], quotes: [], listings: [] };
const FILE = path.join(process.cwd(), "data", "content.json");
const UPLOADS = path.join(process.cwd(), "public", "uploads");
const BLOB_CONTENT = "cms/content.json";
const BLOB_ACCESS = "private" as const;

function withHidden<T extends { hidden?: boolean }>(
  items: T[],
): (T & { hidden: boolean })[] {
  return items.map((item) => ({ ...item, hidden: Boolean(item.hidden) }));
}

function parseContent(raw: string): SiteContent {
  const parsed = JSON.parse(raw) as Partial<SiteContent>;
  return {
    markets: withHidden(Array.isArray(parsed.markets) ? parsed.markets : []),
    deals: withHidden(Array.isArray(parsed.deals) ? parsed.deals : []),
    quotes: withHidden(Array.isArray(parsed.quotes) ? parsed.quotes : []),
    listings: withHidden(Array.isArray(parsed.listings) ? parsed.listings : []),
  };
}

function useBlob() {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID,
  );
}

function assertWritable() {
  if (process.env.VERCEL && !useBlob()) {
    throw new Error(
      "Studio cannot save on Vercel until the Blob store is connected to this project (Storage → your store → Projects).",
    );
  }
}

async function readLocalFile() {
  const raw = await readFile(FILE, "utf8");
  return parseContent(raw);
}

async function readBlobContent() {
  const result = await get(BLOB_CONTENT, {
    access: BLOB_ACCESS,
    useCache: false,
  });
  if (!result || result.statusCode !== 200 || !result.stream) return null;
  const raw = await new Response(result.stream).text();
  return parseContent(raw);
}

export async function getContent(): Promise<SiteContent> {
  try {
    if (useBlob()) {
      const fromBlob = await readBlobContent();
      if (fromBlob) return fromBlob;
    }
    return await readLocalFile();
  } catch {
    return EMPTY;
  }
}

export async function getPublicContent(): Promise<SiteContent> {
  const content = await getContent();
  return {
    markets: content.markets.filter((item) => !item.hidden),
    deals: content.deals.filter((item) => !item.hidden),
    quotes: content.quotes.filter((item) => !item.hidden),
    listings: content.listings.filter((item) => !item.hidden),
  };
}

export async function saveContent(content: SiteContent) {
  assertWritable();
  const json = `${JSON.stringify(content, null, 2)}\n`;

  if (useBlob()) {
    await put(BLOB_CONTENT, json, {
      access: BLOB_ACCESS,
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      cacheControlMaxAge: 0,
    });
    return;
  }

  await mkdir(path.dirname(FILE), { recursive: true });
  await writeFile(FILE, json, "utf8");
}

export async function saveUpload(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;
  if (!file.type.startsWith("image/")) {
    throw new Error("Please choose an image file.");
  }
  if (file.size > 6 * 1024 * 1024) {
    throw new Error("Images must be under 6MB.");
  }

  const ext = file.name.split(".").pop()?.toLowerCase();
  const safeExt =
    ext && ["jpg", "jpeg", "png", "webp", "gif"].includes(ext) ? ext : "jpg";
  const name = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${safeExt}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  const pathname = `uploads/${name}`;

  if (useBlob()) {
    await put(pathname, bytes, {
      access: BLOB_ACCESS,
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: file.type || "image/jpeg",
    });
    return `/api/media/${pathname}`;
  }

  assertWritable();
  await mkdir(UPLOADS, { recursive: true });
  await writeFile(path.join(UPLOADS, name), bytes);
  return `/uploads/${name}`;
}

export async function readUploadBlob(pathname: string) {
  return get(pathname, { access: BLOB_ACCESS });
}

export function newId() {
  return crypto.randomUUID();
}
