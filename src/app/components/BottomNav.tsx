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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex max-w-2xl mx-auto">
        {NAV_ITEMS.map(({ href, icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center py-3 gap-1 transition-colors ${
                active ? "text-[#0E6E8C]" : "text-gray-400"
              }`}
            >
              <span className="text-2xl">{icon}</span>
              <span className={`text-xs font-medium ${active ? "text-[#0E6E8C]" : "text-gray-400"}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
