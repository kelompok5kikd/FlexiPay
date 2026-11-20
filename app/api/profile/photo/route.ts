import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/current-user";
import { readProfilePhoto } from "@/lib/profile-db";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return new NextResponse(null, { status: 401 });
  const photo = await readProfilePhoto(user.id);
  if (!photo || !["image/jpeg", "image/png", "image/webp"].includes(photo.mimeType)) return new NextResponse(null, { status: 404 });
  return new NextResponse(new Uint8Array(photo.content), {
    headers: {
      "Content-Type": photo.mimeType,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
