"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", icon: "🏠", label: "홈" },
  { href: "/info", icon: "📚", label: "정보" },
  { href: "/community", icon: "💬", label: "커뮤니티" },
  { href: "/settings", icon: "⚙️", label: "설정" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
      <div className="flex max-w-2xl mx-auto pb-safe">
        {NAV_ITEMS.map(({ href, icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center py-3 gap-0.5 transition-all active:scale-95 ${
                active ? "text-[#0A3D52]" : "text-gray-400"
              }`}
            >
              <span className="text-2xl">{icon}</span>
              <span className={`text-xs font-semibold ${active ? "text-[#0A3D52]" : "text-gray-400"}`}>
                {label}
              </span>
              {active && (
                <span className="absolute bottom-0 w-8 h-0.5 bg-[#0A3D52] rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
