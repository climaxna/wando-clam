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
      <body className="min-h-full flex flex-col bg-[#EFF6F9] text-[#111827]">
        <header className="bg-[#0A3D52] text-white px-5 py-4 flex items-center justify-between sticky top-0 z-40 shadow-md">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🌊</span>
            <div>
              <span className="font-bold text-xl tracking-tight leading-none block">완도바다</span>
              <span className="text-xs text-blue-200 opacity-80">전복 양식 정보 허브</span>
            </div>
          </div>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 active:bg-white/20 transition-colors"
            aria-label="알람"
          >
            <span className="text-xl">🔔</span>
          </button>
        </header>
        <main className="flex-1 pb-24">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
