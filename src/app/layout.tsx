import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import BottomNav from "./components/BottomNav";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "완도바다",
  description: "전복 양식 어민을 위한 스마트 정보 허브",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#F7F2E8] text-[#111827]">
        <header className="bg-[#0A3D52] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌊</span>
            <span className="font-bold text-lg tracking-tight">완도바다</span>
          </div>
          <button className="text-2xl" aria-label="알람">🔔</button>
        </header>
        <main className="flex-1 pb-20">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
