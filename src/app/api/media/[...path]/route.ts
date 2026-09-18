import { readUploadBlob } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  const parts = (await context.params).path ?? [];
  if (parts.length !== 2 || parts[0] !== "uploads") {
    return new Response("Not found", { status: 404 });
  }

  const file = parts[1];
  if (!/^[A-Za-z0-9._-]+$/.test(file)) {
    return new Response("Not found", { status: 404 });
  }

  const pathname = `uploads/${file}`;
  const result = await readUploadBlob(pathname);
  if (!result || result.statusCode !== 200 || !result.stream) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
