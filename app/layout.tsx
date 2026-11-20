import type { Metadata } from "next";
import { AuthModalProvider } from "./auth-modal-provider";
import { CustomerSupport } from "./customer-support";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlexiPay — Belanja sekarang, bayar lebih fleksibel",
  description: "Nikmati pengalaman belanja dengan pembayaran QRIS dan pilihan cicilan yang bisa disesuaikan dengan kebutuhanmu.",
  icons: {
    icon: "/flexipay-app-icon.png",
    apple: "/flexipay-app-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col"><AuthModalProvider>{children}<CustomerSupport /></AuthModalProvider></body>
    </html>
  );
}
