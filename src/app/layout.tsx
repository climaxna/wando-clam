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
  title: "완도 전복 다이어리",
  description: "완도 전복 양식장 먹이 기록 및 분석 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#F5F0E8] text-[#1A1A2E]">
        <header className="bg-[#0A4F6E] text-white px-4 py-3 flex items-center gap-3 sticky top-0 z-40">
          <span className="text-2xl">🐚</span>
          <span className="font-bold text-lg tracking-tight">완도 전복 다이어리</span>
        </header>
        <main className="flex-1 pb-20">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
