import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/current-user";
import { saveProfile } from "@/lib/profile-db";

const maxAvatarSize = 2 * 1024 * 1024;
const avatarTypes = new Map<string, (bytes: Uint8Array) => boolean>([
  ["image/jpeg", (bytes) => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff],
  ["image/png", (bytes) => bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47],
  ["image/webp", (bytes) => String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP"],
]);

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Silakan login untuk mengubah profil." }, { status: 401 });

    const formData = await request.formData();
    const fullName = String(formData.get("fullName") ?? "").trim().replace(/\s+/g, " ");
    if (fullName.length < 2 || fullName.length > 80) {
      return NextResponse.json({ error: "Nama harus berisi 2–80 karakter." }, { status: 400 });
    }

    const fileValue = formData.get("avatar");
    let avatar: { mimeType: string; content: Buffer } | undefined;
    if (fileValue instanceof File && fileValue.size > 0) {
      const imageType = avatarTypes.get(fileValue.type);
      if (!imageType) return NextResponse.json({ error: "Gunakan foto JPG, PNG, atau WebP." }, { status: 400 });
      if (fileValue.size > maxAvatarSize) return NextResponse.json({ error: "Ukuran foto maksimal 2 MB." }, { status: 400 });

      const bytes = new Uint8Array(await fileValue.arrayBuffer());
      if (!imageType(bytes)) return NextResponse.json({ error: "File tidak sesuai dengan format gambar yang dipilih." }, { status: 400 });
      avatar = { mimeType: fileValue.type, content: Buffer.from(bytes) };
    }

    await saveProfile(user.id, fullName, avatar);
    const refreshedUser = (await getCurrentUser()) ?? user;
    return NextResponse.json({ message: "Profil berhasil diperbarui.", user: refreshedUser }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Gagal menyimpan profil FlexiPay:", error);
    return NextResponse.json({ error: "Profil belum berhasil disimpan. Coba lagi." }, { status: 500 });
  }
}
