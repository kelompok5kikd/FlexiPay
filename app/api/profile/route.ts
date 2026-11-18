import { mkdir, rename, rm, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { join } from "node:path";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/current-user";
import { readProfilePhoto, saveProfile } from "@/lib/profile-db";

const maxAvatarSize = 2 * 1024 * 1024;
const avatarTypes = new Map([
  ["image/jpeg", { extension: "jpg", signature: (bytes: Uint8Array) => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff }],
  ["image/png", { extension: "png", signature: (bytes: Uint8Array) => bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 }],
  ["image/webp", { extension: "webp", signature: (bytes: Uint8Array) => String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP" }],
]);

export async function POST(request: Request) {
  let newAvatarPath: string | undefined;
  let temporaryPath: string | undefined;
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Silakan login untuk mengubah profil." }, { status: 401 });

    const formData = await request.formData();
    const fullName = String(formData.get("fullName") ?? "").trim().replace(/\s+/g, " ");
    if (fullName.length < 2 || fullName.length > 80) {
      return NextResponse.json({ error: "Nama harus berisi 2–80 karakter." }, { status: 400 });
    }

    const fileValue = formData.get("avatar");
    let avatarMime: string | undefined;
    let avatarFilename: string | undefined;
    let previousAvatarPath: string | undefined;
    if (fileValue instanceof File && fileValue.size > 0) {
      const imageType = avatarTypes.get(fileValue.type);
      if (!imageType) return NextResponse.json({ error: "Gunakan foto JPG, PNG, atau WebP." }, { status: 400 });
      if (fileValue.size > maxAvatarSize) return NextResponse.json({ error: "Ukuran foto maksimal 2 MB." }, { status: 400 });

      const bytes = new Uint8Array(await fileValue.arrayBuffer());
      if (!imageType.signature(bytes)) return NextResponse.json({ error: "File tidak sesuai dengan format gambar yang dipilih." }, { status: 400 });

      const directory = join(process.cwd(), "data", "profile-photos");
      await mkdir(directory, { recursive: true });
      avatarFilename = `${user.id}-${randomUUID()}.${imageType.extension}`;
      newAvatarPath = join(directory, avatarFilename);
      temporaryPath = `${newAvatarPath}.tmp`;
      await writeFile(temporaryPath, bytes, { mode: 0o600 });
      await rename(temporaryPath, newAvatarPath);
      temporaryPath = undefined;
      avatarMime = fileValue.type;

      const oldPhoto = readProfilePhoto(user.id);
      if (oldPhoto && /^[a-f0-9-]+\.(jpg|png|webp)$/i.test(oldPhoto.filename)) {
        previousAvatarPath = join(directory, oldPhoto.filename);
      }
    }

    saveProfile(user.id, fullName, avatarMime, avatarFilename);
    if (previousAvatarPath && previousAvatarPath !== newAvatarPath) await rm(previousAvatarPath, { force: true });
    const refreshedUser = (await getCurrentUser()) ?? user;
    return NextResponse.json({ message: "Profil berhasil diperbarui.", user: refreshedUser }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Gagal menyimpan profil FlexiPay:", error);
    if (temporaryPath) await rm(temporaryPath, { force: true }).catch(() => undefined);
    if (newAvatarPath) await rm(newAvatarPath, { force: true }).catch(() => undefined);
    return NextResponse.json({ error: "Profil belum berhasil disimpan. Coba lagi." }, { status: 500 });
  }
}
