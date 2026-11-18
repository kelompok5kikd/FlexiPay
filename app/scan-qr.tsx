"use client";

import { useEffect, useRef, useState } from "react";

type Detector = { detect: (source: HTMLVideoElement) => Promise<Array<{ rawValue: string }>> };
type DetectorWindow = Window & { BarcodeDetector?: new (options?: { formats: string[] }) => Detector };

export function ScanQR() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState("");
  const [payload, setPayload] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const frameRef = useRef<number | null>(null);

  const stopCamera = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setActive(false);
  };

  const close = () => {
    stopCamera();
    setOpen(false);
    setMessage("");
    setPayload("");
  };

  useEffect(() => () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    streamRef.current?.getTracks().forEach((track) => track.stop());
  }, []);

  const startCamera = async () => {
    setMessage("");
    setPayload("");
    const DetectorConstructor = (window as DetectorWindow).BarcodeDetector;
    if (!DetectorConstructor) {
      setMessage("Pemindaian QR otomatis belum didukung browser ini. Coba gunakan Chrome versi terbaru.");
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      setMessage("Browser tidak dapat mengakses kamera. Buka halaman melalui HTTPS atau localhost.");
      return;
    }
    try {
      const detector = new DetectorConstructor({ formats: ["qr_code"] });
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false });
      streamRef.current = stream;
      if (!videoRef.current) return;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setActive(true);
      const scanFrame = async () => {
        if (!videoRef.current || !streamRef.current) return;
        try {
          const [result] = await detector.detect(videoRef.current);
          if (result?.rawValue) {
            if (result.rawValue.startsWith("000201")) {
              setPayload(result.rawValue);
              setMessage("QR terbaca. Data siap diteruskan ke tahap validasi simulasi.");
            } else {
              setMessage("QR terbaca, tetapi formatnya belum didukung. Pastikan kode yang dipindai adalah QRIS.");
            }
            stopCamera();
            return;
          }
        } catch {
          // Camera frames can be momentarily unreadable while autofocus adjusts.
        }
        frameRef.current = requestAnimationFrame(scanFrame);
      };
      frameRef.current = requestAnimationFrame(scanFrame);
    } catch (error) {
      const cameraError = error as { name?: string };
      setMessage(cameraError.name === "NotAllowedError"
        ? "Izin kamera ditolak. Izinkan akses kamera melalui pengaturan browser, lalu coba lagi."
        : "Kamera tidak tersedia atau sedang digunakan aplikasi lain. Periksa kamera lalu coba lagi.");
      stopCamera();
    }
  };

  return <>
    <button className="qris" type="button" onClick={() => setOpen(true)}><span>▦</span> Scan QR</button>
    {open && <div className="scanner-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
      <section className="scanner-dialog" role="dialog" aria-modal="true" aria-labelledby="scanner-title">
        <button type="button" className="scanner-close" onClick={close} aria-label="Tutup pemindai">×</button>
        <div className="eyebrow dark-eyebrow"><span /> FLEXIPAY SCAN</div>
        <h2 id="scanner-title">Pindai kode QR</h2>
        <p className="scanner-description">Arahkan kamera ke kode QR. Pemindai ini membaca QRIS untuk diteruskan ke tahap validasi simulasi.</p>
        <div className={`scanner-view ${active ? "is-active" : ""}`}>
          <video ref={videoRef} muted playsInline aria-label="Pratinjau kamera untuk pemindaian QR" />
          {active && <div className="scan-frame" aria-hidden="true"><i /></div>}
          {!active && <div className="scanner-placeholder"><span>▦</span><b>{payload ? "Pemindaian selesai" : "Kamera belum aktif"}</b><small>{payload ? "Data QR siap untuk validasi simulasi." : "Tekan Aktifkan kamera untuk mulai memindai."}</small></div>}
        </div>
        <p className={`scanner-message ${message ? "visible" : ""}`} role="status">{message || "Pemrosesan pembayaran nyata belum terhubung. Fitur ini hanya simulasi."}</p>
        {payload && <details className="qr-result"><summary>Lihat data QR yang terbaca</summary><code>{payload}</code></details>}
        <div className="scanner-actions"><button type="button" className="button" onClick={startCamera} disabled={active}>{active ? "Kamera aktif" : payload ? "Pindai lagi" : "Aktifkan kamera"}</button><button type="button" className="scanner-stop" onClick={active ? stopCamera : close}>{active ? "Matikan kamera" : "Tutup"}</button></div>
      </section>
    </div>}
  </>;
}
