import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

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

function withHidden<T extends { hidden?: boolean }>(items: T[]): (T & { hidden: boolean })[] {
  return items.map((item) => ({ ...item, hidden: Boolean(item.hidden) }));
}

export async function getContent(): Promise<SiteContent> {
  try {
    const raw = await readFile(FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<SiteContent>;
    return {
      markets: withHidden(Array.isArray(parsed.markets) ? parsed.markets : []),
      deals: withHidden(Array.isArray(parsed.deals) ? parsed.deals : []),
      quotes: withHidden(Array.isArray(parsed.quotes) ? parsed.quotes : []),
      listings: withHidden(Array.isArray(parsed.listings) ? parsed.listings : []),
    };
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
  await mkdir(path.dirname(FILE), { recursive: true });
  await writeFile(FILE, `${JSON.stringify(content, null, 2)}\n`, "utf8");
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
  await mkdir(UPLOADS, { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOADS, name), bytes);
  return `/uploads/${name}`;
}

export function newId() {
  return crypto.randomUUID();
}
