import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/current-user";
import { readProfilePhoto } from "@/lib/profile-db";

const extensions: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return new NextResponse(null, { status: 401 });
  const photo = readProfilePhoto(user.id);
  const extension = photo ? extensions[photo.mimeType] : null;
  if (!photo || !extension || !/^[a-f0-9-]+\.(jpg|png|webp)$/i.test(photo.filename) || !photo.filename.endsWith(`.${extension}`)) {
    return new NextResponse(null, { status: 404 });
  }

  try {
    const image = await readFile(join(process.cwd(), "data", "profile-photos", photo.filename));
    return new NextResponse(new Uint8Array(image), {
      headers: {
        "Content-Type": photo.mimeType,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}
