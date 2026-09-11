import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type Market = {
  id: string;
  name: string;
  copy: string;
  image: string;
};

export type Deal = {
  id: string;
  title: string;
  copy: string;
  image: string;
};

export type Quote = {
  id: string;
  name: string;
  body: string;
};

export type Listing = {
  id: string;
  title: string;
  copy: string;
  image: string;
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

export async function getContent(): Promise<SiteContent> {
  try {
    const raw = await readFile(FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<SiteContent>;
    return {
      markets: Array.isArray(parsed.markets) ? parsed.markets : [],
      deals: Array.isArray(parsed.deals) ? parsed.deals : [],
      quotes: Array.isArray(parsed.quotes) ? parsed.quotes : [],
      listings: Array.isArray(parsed.listings) ? parsed.listings : [],
    };
  } catch {
    return EMPTY;
  }
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
