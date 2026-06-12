"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", icon: "🏠", label: "홈" },
  { href: "/zones", icon: "🦪", label: "구역" },
  { href: "/feeding", icon: null, label: "급이", isCta: true },
  { href: "/analysis", icon: "📊", label: "분석" },
  { href: "/settings", icon: "⚙️", label: "설정" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 safe-area-inset-bottom">
      <ul className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {NAV.map(({ href, icon, label, isCta }) => {
          const active = pathname === href;
          if (isCta) {
            return (
              <li key={href} className="flex-1 flex justify-center">
                <Link
                  href={href}
                  className="flex flex-col items-center justify-center w-14 h-14 bg-[#1B8AB8] rounded-full -mt-6 shadow-lg hover:bg-[#0A4F6E] transition-colors"
                >
                  <span className="text-white text-3xl font-light leading-none">+</span>
                </Link>
              </li>
            );
          }
          return (
            <li key={href} className="flex-1 flex justify-center">
              <Link
                href={href}
                className={`flex flex-col items-center gap-0.5 py-2 px-3 ${active ? "text-[#0A4F6E]" : "text-gray-400"}`}
              >
                <span className="text-xl">{icon}</span>
                <span className="text-xs">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
