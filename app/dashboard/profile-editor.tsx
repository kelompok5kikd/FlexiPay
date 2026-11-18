"use client";

import { useEffect, useState, type FormEvent, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";

type ProfileEditorProps = {
  fullName: string;
  email: string;
  phone: string;
  createdAt: string;
  avatarUrl: string | null;
};

function getInitials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "F";
}

export function ProfileEditor({ fullName, email, phone, createdAt, avatarUrl }: ProfileEditorProps) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(fullName);
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview);
  }, [preview]);

  const selectPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.currentTarget.files?.[0] ?? null;
    setPhoto(selected);
    setPreview(selected ? URL.createObjectURL(selected) : null);
    setError("");
  };

  const cancelEdit = () => {
    setName(fullName);
    setPhoto(null);
    setPreview(null);
    setError("");
    setEditing(false);
  };

  const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    const data = new FormData();
    data.set("fullName", name);
    if (photo) data.set("avatar", photo);

    try {
      const response = await fetch("/api/profile", { method: "POST", body: data });
      const responseText = await response.text();
      let result: { error?: string; message?: string } = {};
      try {
        result = JSON.parse(responseText) as typeof result;
      } catch {
        setError(`Server gagal memproses perubahan (HTTP ${response.status}). Coba muat ulang halaman.`);
        return;
      }
      if (!response.ok) {
        setError(result.error ?? "Profil belum berhasil diperbarui. Coba lagi.");
        return;
      }
      setSuccess(result.message ?? "Profil berhasil diperbarui.");
      setPhoto(null);
      setPreview(null);
      setEditing(false);
      router.refresh();
    } catch (cause) {
      console.error("Gagal mengirim perubahan profil:", cause);
      setError("Koneksi bermasalah. Periksa koneksi lalu coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  const memberSince = new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric", timeZone: "Asia/Jakarta" }).format(new Date(createdAt));
  const imageUrl = preview ?? avatarUrl;

  return (
    <section className="dashboard-account-card" id="profil" aria-labelledby="dashboard-profile-title">
      <div className="dashboard-section-heading">
        <div><span className="dashboard-section-kicker">INFORMASI AKUN</span><h2 id="dashboard-profile-title">Profil nasabah</h2></div>
        <div className="dashboard-profile-actions">
          <span className="dashboard-profile-avatar" aria-label={imageUrl ? "Foto profil" : `Inisial ${getInitials(name)}`}>
            {imageUrl ? <img src={imageUrl} alt="" /> : getInitials(name)}
          </span>
          {!editing && <button className="dashboard-edit-profile" type="button" onClick={() => { setSuccess(""); setEditing(true); }}>Edit profil</button>}
        </div>
      </div>

      {success && <p className="profile-feedback profile-feedback-success" role="status">{success}</p>}

      {editing && <form className="profile-edit-form" onSubmit={saveProfile}>
        <label className="profile-edit-name">Nama lengkap
          <input name="fullName" value={name} onChange={(event) => setName(event.currentTarget.value)} minLength={2} maxLength={80} autoComplete="name" required />
        </label>
        <label className="profile-edit-photo">Foto profil
          <input name="avatar" type="file" accept="image/jpeg,image/png,image/webp" onChange={selectPhoto} />
          <small>JPG, PNG, atau WebP. Maksimal 2 MB.</small>
        </label>
        {error && <p className="profile-feedback profile-feedback-error" role="alert">{error}</p>}
        <div className="profile-edit-actions">
          <button className="profile-save-button" type="submit" disabled={saving}>{saving ? "Menyimpan…" : "Simpan perubahan"}</button>
          <button className="profile-cancel-button" type="button" onClick={cancelEdit} disabled={saving}>Batal</button>
        </div>
      </form>}

      <div className="dashboard-account-fields">
        <div><span>Nama lengkap</span><strong>{fullName}</strong></div>
        <div><span>Email</span><strong>{email}</strong></div>
        <div><span>Nomor HP</span><strong>{phone}</strong></div>
        <div><span>Bergabung</span><strong>{memberSince}</strong></div>
      </div>
    </section>
  );
}
